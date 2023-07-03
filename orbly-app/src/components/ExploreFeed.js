import React from "react";
import "./styles/ExploreFeed.css";

const ExploreFeed = ({
    theme,
    authUser,
    publicPosts,
}) => {

    const uniqueTrendingItemsAndCount = () => {
        const trendingItems = [];
        publicPosts.forEach((post) => {
            const postText = post.postText.toLowerCase();
            const postTextArray = postText.split(' ');
            postTextArray.forEach((word) => {
                if (word.includes('#')) {
                    trendingItems.push(
                        word.replace(/(\r\n|\n|\r|😁)/gm, "").charAt(0) + word.replace(/(\r\n|\n|\r|😁)/gm, "").slice(1).charAt(0).toUpperCase() + word.replace(/(\r\n|\n|\r|😁)/gm, "").slice(2)
                    )
                } else if (word.includes('@')) {
                    trendingItems.push(
                        word.replace(/(\r\n|\n|\r|😁)/gm, "").charAt(0) + word.replace(/(\r\n|\n|\r|😁)/gm, "").slice(1).charAt(0).toUpperCase() + word.replace(/(\r\n|\n|\r|😁)/gm, "").slice(2)
                    );
                } else if (word.includes('http')) {
                    trendingItems.push(
                        word.replace(/(\r\n|\n|\r|😁)/gm, "").replace('http://', '').replace('https://', '')
                    );
                } else if (word.includes('www')) {
                    trendingItems.push(
                        word.replace(/(\r\n|\n|\r|😁)/gm, "").replace('www.', '')
                    );
                } else {
                    trendingItems.push(
                        word.replace(/(\r\n|\n|\r|😁)/gm, "").charAt(0).toUpperCase() + word.replace(/(\r\n|\n|\r|😁)/gm, "").slice(1)
                    );
                }
            });
        });

        const uniqueTrendingItems = trendingItems.filter((v, i, a) => a.indexOf(v) === i);
        const uniqueTrendingItemsAndCount = [];
        uniqueTrendingItems.forEach((item) => {
            uniqueTrendingItemsAndCount.push({
                item: item,
                count: trendingItems.filter((v) => v === item).length,
            });
        });

        return uniqueTrendingItemsAndCount;
    }

    // console.log(uniqueTrendingItemsAndCount().sort((a, b) => b.count - a.count).slice(0, 10));

    return ( 
        <div className="ExploreFeed">
            <div className="ExploreFeed-search">
                <input type="text" className="ExploreFeed-search-input" placeholder="Search" />
            </div>
            <div className="ExploreFeed-trending">
                <div className="ExploreFeed-trending-header">
                    <h1 className="ExploreFeed-trending-header-text">Trending</h1>
                </div>
                <div className="ExploreFeed-trending-items">
                    <ul className="ExploreFeed-trending-items-list">
                        {uniqueTrendingItemsAndCount().sort((a, b) => b.count - a.count).slice(0, 10).filter((item) => item.item !== '').map((item, index) => (
                            <li key={index} className="ExploreFeed-trending-item">
                                <span className="ExploreFeed-trending-item-number">
                                    {index + 1}.
                                </span>
                                &nbsp;
                                <a href={`/hashtag/${item.item}`} className="ExploreFeed-trending-link">{item.item}</a>
                                &nbsp;
                                <span className="ExploreFeed-trending-item-count">
                                    {item.count} posts
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default ExploreFeed;