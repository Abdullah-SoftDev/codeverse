'use client'
import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({ children }: { children: ReactNode }) {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.push("/");
    }, [router]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === overlay.current && onDismiss) {
                onDismiss();
            }
        },
        [onDismiss, overlay]
    );

    return (
        <div ref={overlay} className="fixed z-40 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80" onClick={(e) => handleClick(e)}>
            <div ref={wrapper} className="flex-col absolute h-[95%] w-full bottom-0 bg-white rounded-t-3xl overflow-auto">
                <button type="button" onClick={onDismiss} className="absolute top-4 right-4" >
                    <XMarkIcon className="w-6 h-6" />
                </button>
                {children}
            </div>
        </div>
    );
}
