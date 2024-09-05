"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { collection, doc } from "@firebase/firestore";
import { db } from "@/firebase";
import { addDoc } from "firebase/firestore";

const ResultPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const searcHParams = useSearchParams();
  const session_id = searcHParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id || !user) {
        return;
      }

      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );
        const sessionData = await res.json();

        if (res.ok) {
          // store info for user in database
          try {
            const userDocRef = doc(db, "users", user.id);
            const donationsCollectionRef = collection(userDocRef, "donations");
            const donationInfo = {
              session_id,
              status: sessionData.payment_status,
              created: new Date().toISOString(),
            };
            await addDoc(donationsCollectionRef, donationInfo);
          } catch (error) {
            console.error("Error adding donation: ", error);
            setError("Failed to save donation.");
          }

          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [session_id, user]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      {session.payment_status === "paid" ? (
        <>
          <h1>Thank you for donating!</h1>
          <h1>Session ID: {session_id}</h1>
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </>
      ) : (
        <>
          <h1>Payment failed</h1>
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ResultPage;
