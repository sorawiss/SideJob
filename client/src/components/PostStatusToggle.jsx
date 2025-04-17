import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmDialog from "./ConfirmDialog";
import SwitchBtn from "./SwitchBtn";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function PostStatusToggle({ postID, status, posterID }) {
    const [isOn, setIsOn] = useState(status);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingStatus, setPendingStatus] = useState(null);

    const queryClient = useQueryClient();

    useEffect(() => {
        setIsOn(status);
    }, [status]);

    async function updateStatus(newStatus) {
        try {
            const res = await fetch(`${baseUrl}/switchPost/${postID}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            return newStatus;
        }
        catch (error) {
            console.error("error in updateStatus", error);
        }
    }

    // Mutation
    const mutation = useMutation({
        mutationFn: updateStatus,
        onSuccess: (newStatus) => {
            queryClient.invalidateQueries({ queryKey: ["profile", String(posterID)] });
            queryClient.invalidateQueries({ queryKey: ["inPost", String(postID)] });
            setIsOn(newStatus);
            console.log("Mutation Success", newStatus)
        },
        onError: () => setIsOn(status),
    });

    const handleRequestChange = () => {
        const newStatus = !isOn;
        setPendingStatus(newStatus);
        if (status === false) {
            mutation.mutate(newStatus)
        }
        else {
            setConfirmOpen(true);
        }
    };

    const handleConfirm = () => {
        if (pendingStatus !== null) {
            mutation.mutate(pendingStatus);
            setConfirmOpen(false);
        }
    };

    const handleCloseDialog = () => {
        setConfirmOpen(false);
        setPendingStatus(null);
    };

    return (
        <>
            <SwitchBtn
                isOn={isOn}
                disabled={mutation.isPending}
                onRequestChange={handleRequestChange}
            />

            <ConfirmDialog
                open={confirmOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirm}
                body={"เมื่อเปลี่ยนสถานะโพสต์ โพสต์ของคุณจะไม่ถูกมองเห็นในหน้าหลักแต่ยังคงอยู่ในโปรไฟล์ของคุณ"}
            />
        </>
    );
}