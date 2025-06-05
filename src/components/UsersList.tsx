"use client";

import { UsersProps } from "@/types/index.types";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { USER_OPTIONS } from "@/assets/data/user";
import { moreVert } from "@/assets/icons";

import { changeDateFormat } from "@/helpers";

export default function UsersList({ users }: UsersProps) {
    const router = useRouter();
    const optionsContainerRef = useRef<HTMLUListElement>(null);
    const [indexOfUserOptionToShow, setIndexOfUserOptionToShow] = useState<number | null>(null);
    
    function openOptionsModal(index: number) {
        setIndexOfUserOptionToShow(index);
    };
    function closeOptionsModal() {
        setIndexOfUserOptionToShow(null);
    };
    function navigateToUser(userId: string) {
        router.push(`/user/${userId}`);
    };

    const handleModalClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (!optionsContainerRef.current || indexOfUserOptionToShow === null) return;

        const containerRect = optionsContainerRef.current.getBoundingClientRect();
        const clickedOutsideModalRange = event.clientX < containerRect.left ||
            event.clientX > (containerRect.left + containerRect.width) || 
            event.clientY < containerRect.top || 
            event.clientY > (containerRect.top + containerRect.height);

        if (clickedOutsideModalRange) closeOptionsModal();
    };

    return (
        <tbody>
            {
                users.map(({ _id, organization, firstName, lastName, email, phone, dateJoined, status }, index) => (
                    <tr key={email}>
                        <td onClick={() => navigateToUser(_id)}>{organization}</td>
                        <td onClick={() => navigateToUser(_id)}>{firstName} {lastName}</td>
                        <td onClick={() => navigateToUser(_id)}>{email}</td>
                        <td onClick={() => navigateToUser(_id)}>{phone}</td>
                        <td onClick={() => navigateToUser(_id)}>{changeDateFormat(dateJoined)}</td>
                        <td onClick={() => navigateToUser(_id)}>
                            <span className={`user-status ${status.toLowerCase()}`}>{status.toLowerCase()}</span>
                        </td>
                        <td className="more-column">
                            <span className="button-and-options-container">
                                <button onClick={() => openOptionsModal(index)} className="more-btn">
                                    <Image src={moreVert} className="more-icon" alt="More icon" width={20} height={20} />
                                </button>

                                <div onClick={handleModalClick} className={`options-container ${indexOfUserOptionToShow == index ? 'show-menu' : 'hide'}`}>
                                    <ul ref={optionsContainerRef}>
                                        {
                                            USER_OPTIONS.map(({ title, icon }) => (
                                                <li key={title}>
                                                    <button className="option">
                                                        <Image src={icon} alt={`${title} icon`} width={14} height={14} className="option-icon" />
                                                        <span className="font-work-sans">{title}</span>
                                                    </button>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </span>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
};