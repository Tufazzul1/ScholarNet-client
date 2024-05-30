// RecentlyViewedBooks.js
import { useEffect, useState } from 'react';
import RecentCard from './RecentCard';

const RecentlyViewedBooks = () => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('recentlyViewedBooks')) || [];
        setRecentlyViewed(storedBooks);
    }, []);

    return (
        <div>
            <h2 className='text-4xl text-center text-green-500 font-bold mt-16 mb-10'>Recently Viewed Books</h2>
            <div className='grid grid-cols-5 gap-4'>
                {
                    recentlyViewed.map((book) => 
                        <RecentCard 
                        key={book._id}
                        book={book}
                        >
                        </RecentCard>
                    )
                }
            </div>
        </div>
    );
};

export default RecentlyViewedBooks;
