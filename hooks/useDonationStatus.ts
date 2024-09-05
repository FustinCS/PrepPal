import { db } from '@/firebase';
import { useUser } from '@clerk/nextjs';
import { collection, doc, getDocs } from 'firebase/firestore';
import {useState, useEffect} from 'react';

export function useDonationStatus() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [donated, setDonated] = useState(false);

    useEffect(() => {
        async function getDonationStatus() {
            if (!user) return;
            const userDocRef = doc(db, "users", user.id);
            const donationsCollectionRef = collection(userDocRef, "donations");
            const donationsDoc = await getDocs(donationsCollectionRef);

            if (donationsDoc.empty) {
                setDonated(false);
            }

            donationsDoc.forEach((doc) => {
                if (doc.exists()) {
                    setDonated(true);
                }
            });
        }

        getDonationStatus();
    }, [user]);

    return donated;

}