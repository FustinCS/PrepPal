import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import axios from "axios";
import * as cheerio from 'cheerio';
import { Meal } from '@/utils/types';
import { createClient } from 'pexels';
import dotenv from 'dotenv';

const systemPrompt = `
You will be provided with a list of ingredients. Based on these ingredients, you are to generate a list of popular dishes that can be made using them. 
The dishes must be widely recognized and have multiple online sources that provide recipes for the exact same dish name. 
Avoid suggesting dishes that are obscure or made up.

Remember: The goal is to provide a popular, well documented, and satisfying meal plan that is both practical and enjoyable.

Please provide 8 meals.

The criteria is as followed: 

Meal Name: A descriptive name of the meal.
Calorie Count: The approximate calorie count per serving.
Short Description: A brief overview of the meal, including key ingredients and flavors.
Link: A direct URL in https:// format to the recipe or source where the meal can be found.

Return in the following JSON format where "meals" will be an array of objects:
{
    "meals": [
        {
            "name": str,
            "calories": int,
            "description": str,
            "link": str,
            "image": str
        }
    ]
}
`

export async function POST(req: NextRequest) {
    const openai = new OpenAI();
    const client = createClient(process.env.PEXELS_API_KEY!);

    
    // Parse the incoming JSON data
    const data = await req.json();
    const ingredients: string[] = data.ingredients;

    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: ingredients.join(', ')},
        ],
        model: 'gpt-4o-mini',
        response_format: {type: 'json_object'},
    })
    try {
        const result = JSON.parse(completion.choices[0].message.content ?? "");
        const newMeals = await Promise.all(result.meals.map(async (meal: Meal) => {
            const res = await client.photos.search({
                query: meal.name.replaceAll(' ', '+'),
                per_page: 1,
            });

            if ('photos' in res && res.photos.length > 0) {
                return { ...meal, image: res.photos[0].src.medium };
            }
        }));
        console.log(newMeals);
        return NextResponse.json(newMeals);
    } catch (error) {
        return NextResponse.error();
    }

}