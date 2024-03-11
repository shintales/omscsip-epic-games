import { For, JSX, Show, createEffect, createSignal, onCleanup, onMount } from "solid-js"
import './NewsFeed.css';
import Bookmark from "./Bookmark";
import Lightbulb from "./Lightbulb";
import ToolTip from "./ToolTip";
import toast, { Message } from "solid-toast";

function titleToUrl(title: string): string {
    return "https://store.epicgames.com/en-US/news/" + title.toLowerCase().replace(/:/g, "").replace(/[ ']/g, "-")
}


function mySuccessToast(message: Message) {
    toast.success(message, {
        style: {
            "background-color": "var(--grey-background)",
            color: "var(--white-font-color)",
            fill: "blue"
        }
    });
}

interface DropDownProps {
    button: JSX.Element,
    menuitems: string[]
}
function useClickOutside(ref: HTMLDivElement | undefined, onClickOutside: () => void) {
    const handleClickOutside = (event: any) => {
        if (ref && !ref.contains(event.target)) {
            onClickOutside();
        }
    };

    onMount(() => {
        document.addEventListener('mousedown', handleClickOutside);
    });

    onCleanup(() => {
        document.removeEventListener('mousedown', handleClickOutside);
    });
}
function Dropdown(props: DropDownProps) {
    let dropdownRef: HTMLDivElement | undefined;
    const [showMenu,setShowMenu] = createSignal(false)
    const toggleShowMenu = () => {
        setShowMenu(!showMenu())
    }
    
    useClickOutside(dropdownRef, toggleShowMenu)
    return (
        <div class="dropdown">
            <div class="dropbtn" onClick={toggleShowMenu}>
                {props.button}
            </div>
            <Show when={showMenu()}>
                <div class="dropdown-content" ref={dropdownRef}>
                    <For each={props.menuitems}>{(item) => 
                            <a href="#" onClick={() => {
                                toggleShowMenu()
                                mySuccessToast(item)
                            }}>{item}</a>
                    }</For>
                </div>
            </Show>
        </div>
    )
}

export default () => {
    const [newsData] = createSignal([
        {
            title: "Turnip Boy Robs A Bank continues the felonious vegetable's goofy crime spree",
            image: "https://cdn2.unrealengine.com/turnip-boy-robs-a-bank-continues-the-felonious-vegetable-s-goofy-crime-spree-3840x2082-c7114c92b8cc.jpeg",
            description: "With the release of Turnip Boy Robs a Bank, the sentient vegetable jumps genres and gets himself a gun, providing a whole new way to play",
            lastModified: "6D AGO"
        },
        {
            title: "Exclusive chat with the team behind upcoming food-fighter RAWMEN about the labor inside the love",
            image: "https://cdn2.unrealengine.com/editorial-articleimage-1920x1080-3b-1920x1080-358668210e9b.jpg",
            description: "As the TinyBuild-owned studio Animal brings its food-fighting arena shooter to a boil, the game’s creators reflect on an unexpectedly demanding development cycle",
            lastModified: "3H AGO"
        },
        {
            title: "Rainbow Six Siege: A beginner's guide",
            image: "https://cdn2.unrealengine.com/thunderbird-rainbow-six-siege-3840x2160-61b26fb8470e.jpg",
            description: "Operators, game modes, maps, and more",
            lastModified: "1M AGO"
        },
        {
            title: "A beginner’s guide to Bandle Tale: A League of Legends Story",
            image: "https://cdn2.unrealengine.com/bandle-tale-a-league-of-legends-story-3840x2160-c8cc778f18d0.jpg",
            description: "It’s time for Yordles to shine",
            lastModified: "3D AGO"
        },
        {
            title: "Nightingale beginner’s guide: 12 tips to help you survive the Fae Realms",
            image: "https://cdn2.unrealengine.com/nightingale-beginners-guide-survival-tips-3840x2160-df785666e2a0.jpg",
            description: "Our Nightingale guide has tips to aid you on your journey to the fabled city.",
            lastModified: "12D AGO"
        }

    ])
    return (
        <ul class="article-list">
            <For each={newsData()}>{(newsItem, i) =>
                <li class="article">
                    <img src={newsItem.image} alt="Article Image" class="article-image"/>
                    <div class="article-content">
                        <span class="article-timestamp">{newsItem.lastModified}</span>
                        <div class="article-text">
                            <h3 class="article-title">{newsItem.title}</h3>
                            <p class="article-summary">{newsItem.description}</p>
                        </div>
                        <div class="article-lower">
                            <span class="article-read-more">Read more</span>
                            <div class="article-toolbar">
                                <ToolTip text="Bookmark Article" altText="Remove Bookmark" onSuccess={() => mySuccessToast("Bookmark Added!")}>
                                    <Bookmark/>
                                </ToolTip>
                                <Dropdown menuitems={[
                                    "Visit Store Page",
                                    "Add to Wishlist",
                                    "Mute Author",
                                    "Mute Game",
                                ]} button={
                                    <ToolTip text="More Options">
                                        <Lightbulb/>
                                    </ToolTip>
                                }/>
                            </div>
                        </div>
                    </div>
                </li>
            }</For>
        </ul>
    )
}