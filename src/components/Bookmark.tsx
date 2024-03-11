import { Show, createSignal } from 'solid-js';
import "./Bookmark.css"
import BookmarkRegular from '../assets/bookmark-regular.svg';
import BookmarkSolid from '../assets/bookmark-solid.svg';

export default () => {
    const [isBookmarked, setIsBookmarked] = createSignal(false)
    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked());
    };

    return (
        <div class="bookmark" onClick={toggleBookmark}>
            <Show when={isBookmarked()} fallback={<BookmarkRegular/>}>
                <BookmarkSolid/>
            </Show>
        </div>
    );
}
