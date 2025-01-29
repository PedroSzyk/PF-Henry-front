"use client";
import React, { useEffect, useState } from "react";
import { cancelledReservation, getReservations } from "@/helpers/auth.helper";
import { IReservations } from "@/interfaces/Types";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserContext } from "@/context/UserContext";

const BookingHistorial = () => {
  const {userNormal} = useUserContext()
  const [userId, setUserId] = useState<string | null>(null);
  const [reservations, setReservations] = useState<IReservations[]>([]);
  const { user } = useUser();

  // console.log(userNormal?.id);

  // console.log(usuario.email)
  // const email = token?.email
  
  // console.log(userNormal)

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("user")
      const usuario = JSON.parse(token!)
      
      try {
        if (token) {
          console.log(usuario.email);
          
          const { data } = await getReservations(usuario.email);
          console.log(data);
          
          setReservations(data);
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservations();
  }, [userNormal]);

  if (!userId) {
    return null;
  }

  const cancelReservations = async (id: string) => {
    try {
      const response = await cancelledReservation(id);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );

      alert("Reserva cancelada con éxito");
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("No se pudo cancelar la reserva");
    }
  };

  return (
    <div>
      <h1 className="flex justify-center items-center p-5 m-5">
        Reservation history
      </h1>
      {Array.isArray(reservations) && reservations.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-slate-200 w-80 h-60 p-4 rounded shadow-md flex flex-col justify-between"
            >
              <p>Reservation date: {reservation.date}</p>
              <p>Number of people: {reservation.guest}</p>
              <p>Schedule: {reservation.time}</p>
              <p>
                Reservation status:{" "}
                <span
                  className={`${
                    reservation.status === "confirmed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {reservation.status}
                </span>
              </p>

              {reservation.status === "confirmed" && (
                <button
                  onClick={() => cancelReservations(reservation.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  cancel reservation
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No reservations available</p>
      )}

      <div className="flex justify-center p-5 m-4">
        <Link
          href="/createBooking"
          className="flex justify-center items-center border max-w-25 p-4 rounded"
        >
          Create reservation
        </Link>
      </div>
    </div>
  );
};

export default BookingHistorial;
