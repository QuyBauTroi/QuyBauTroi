"use client"
import { useRouter } from "next/router";
import MainLayout from "../Layout/MainLayout";
import { getAmenityById, getFullRoomData , getRoomStatusById , getRoomAmenitiesByRoomId } from "@/data/data";

interface RoomDetailPageProps {
    roomId : number;
}

export function RoomDetail(){
    const router = useRouter();
    
    return(
        <MainLayout>
            <div>Room Details Content</div>
        </MainLayout>
    );
}