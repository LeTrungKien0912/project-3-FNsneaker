import { useState } from 'react';
import { MessageOutlined, CloseOutlined } from '@ant-design/icons'
import zalo from "../../assets/th.png"
import hotline from "../../assets/hotline.jpg"
import email from "../../assets/email.png"
import face from "../../assets/face.png"

import styles from "./index.module.css"
import classNames from 'classnames';

const ContactButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleContactInfo = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-2">
            {isOpen && (
                <div className="flex flex-col items-center space-y-2 mb-2 bg-white rounded-lg p-4 shadow-lg">
                    <a href="tel:+0399965025" className="flex items-center space-x-2 p-2 bg-white text-black rounded-full shadow-md w-full">
                        <img src={hotline} alt="Hotline" className="w-7 h-7" />
                        <span className='font-medium hover:font-bold'>0399965025</span>
                    </a>
                    <a href="https://zalo.me/0399965025" className="flex items-center space-x-4 pt-2 bg-white text-black  rounded-full shadow-md w-full">
                        <img src={zalo} alt="Zalo" className="w-10 h-10" />
                        <span className='font-medium hover:font-bold'>Zalo</span>
                    </a>
                    <a href="mailto:fsneakershop@gmail.com" className="flex items-center space-x-4 bg-white text-black p-2 rounded-full shadow-md w-full">
                        <img src={email} alt="Email" className="w-5 h-5" />
                        <span className='font-medium hover:font-bold'>Email</span>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61563111446894" className="flex items-center space-x-4 bg-white text-black p-2 rounded-full shadow-md w-full">
                        <img src={face} alt="Store" className="w-5 h-5" />
                        <span className='font-medium hover:font-bold'>Facebook</span>
                    </a>
                </div>
            )}
            <button
                onClick={toggleContactInfo}
                className={classNames('flex flex-col items-center text-white p-2 rounded-full shadow-lg bg-black', styles.shake)}
            >
                {isOpen ? (
                    <>
                        <CloseOutlined />

                    </>
                ) : (
                    <>
                        {/* <img src="https://via.placeholder.com/40?text=Liên hệ" alt="Contact Icon" className="w-10 h-10 mb-2" /> */}
                        <MessageOutlined />
                        <span className="text-white font-medium">Liên hệ</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default ContactButton;