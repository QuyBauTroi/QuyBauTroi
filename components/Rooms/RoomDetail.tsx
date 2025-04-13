"use client"
import { useRouter } from "next/router";
import MainLayout from "../Layout/MainLayout";
import { useEffect } from "react";
import { getAmenityById, getFullRoomData , getRoomStatusById , getRoomAmenitiesByRoomId } from "@/data/data";

interface RoomDetailPageProps {
    roomId : number;
}

export function RoomDetail(){
    const router = useRouter();
    const [room, setRoom] = useState<Room | null>(null)
    onst [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        // In a real app, you would fetch the room data from your API
        const rooms = getFullRoomData()
        const foundRoom = rooms.find((r) => r.room_id === roomId)
        setRoom(foundRoom || null)
        setLoading(false)
      }, [roomId])
    
    const handleEdit = () => {
        setIsEditDialogOpen(true)
    }
    const handleDelete = () => {
        setIsDeleteDialogOpen(true)
    }

    return(
        <MainLayout>
            <div>Room Details Content</div>
        </MainLayout>
    );
}