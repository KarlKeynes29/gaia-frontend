import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Game {
	id: string;
    title: string;
    description: string;
    genre?: string;
    image?: string;
	price: string | number;
	is_featured?: boolean;
}

export const HomePage: React.FC = () => {
    const [showcasedItems, setShowcasedItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // Carousel of games
    // Carousel of merch and other stuff
    useEffect(() => {
        const fetchItemsToShowcase = async () => {
			try {
                setIsLoading(true);

                const BASE_URL = import.meta.env.BASE_URL;
				const response = await fetch(`${BASE_URL}/games?featured=true`);

				if (!response.ok) {
					throw new Error('Failed to fetch catalog of items.');
				}

				const data = await response.json();
				setShowcasedItems(data);
            } catch (error) {
				console.error('Errr fetching showcase items:', error);
				toast.error('Could not load featured items.');
			} finally {
				setIsLoading(false);
            }
		}
        fetchItemsToShowcase()
    }, []);


    return (
        <div>
            <header>
                <div>
                    <h1>Welcome to Cyber Gaia!</h1>
                    <p>Discover the latest games and official gear.</p>
                </div>
            </header>

        </div>

    )
}
