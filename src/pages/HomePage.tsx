import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Game {
    title: string;
    description: string;
    genre?: string;
    image: string;
    price: string;
}

export const HomePage: React.FC = () => {
    const [showcasedItems, setShowcasedItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // Carousel of games
    // Carousel of merch and other stuff
    useEffect(() => {
        const fetchItemsToShowcase = async () => {
            try {
                const BASE_URL = import.meta.env.BASE_URL;
                const response = fetch(`${BASE_URL}/games`, );
            } catch (error) {

            }

        }
    });


    return (
        <div>
            <header>
                <div>
                    <h1>Welcome to The Platform!</h1>
                    <p></p>
                </div>
            </header>

        </div>

    )
}
