import { createSignal, For, Show } from 'solid-js';
import './SearchBar.css';
import Carot from './Carot';
import SearchIcon from "../assets/search.svg";
import ToolTip from './ToolTip';

type Game = {
  title: string,
  image: string
}
const keywords = [
  { title: "Expeditions: A MudRunner Game", image: "https://cdn2.unrealengine.com/get-stuck-up-a-literal-creek-without-a-paddle-in-expeditions-a-mudrunner-game-1920x1080-b42d4d908436.jpg"},
  { title: "Bandal Tale", image: "https://cdn2.unrealengine.com/bandle-tale-a-league-of-legends-story-9-1920x1080-14b92d05522b.jpg"},
  { title: "Turnip Boy Commits Tax Evasion", image: "https://cdn2.unrealengine.com/turnip-boy-robs-a-bank-continues-the-felonious-vegetable-s-goofy-crime-spree-3840x2082-c7114c92b8cc.jpeg"},
  { title: "Turnip Boy Robs a Bank", image: "https://cdn2.unrealengine.com/turnip-boy-robs-a-bank-continues-the-felonious-vegetable-s-goofy-crime-spree-3840x2082-c7114c92b8cc.jpeg"}
]

function SearchBar() {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [showOptions, setShowOptions] = createSignal(false);

  const [advancedOptions,setAdvancedOptions] = createSignal([
    {label: "Game", type: "text", value: "", helpText: 'Example: Megaman 9 · Search contains articles related to Megaman 9'},
    {label: "Author", type: "text", value: "", helpText: 'Example: John Doe  · search contains articles written by "John Doe"'},
    {label: "Any of these words", type: "text", value: "", helpText: 'Example: rpg fps · search contains "rpg", "fps" or both'},
    {label: "None of these words", type: "text", value: "", helpText: 'Example: rpg fps · search contains neither rpg or fps'},
    {label: "Include hashtags", type: "text", value: "", helpText: 'Example: #rpg #fps · search for articles with these hashtags'},
  ]);

  const toggleSearchOptions = () => {
    setShowOptions(!showOptions());
  }
  const autoCompleteOptions = () => {
    if (searchQuery()) return keywords.filter(game => game.title.toLowerCase().includes(searchQuery().toLowerCase()))
    else return []
  }
  const showResultBox = () => autoCompleteOptions().length > 0;
  return (
    <div class="search-container">
      <div class="searchbar">
        <SearchIcon class="search-icon" />
        <input
          type="text"
          placeholder="Search for gaming articles"
          value={searchQuery()}
          onInput={(e) => {
            const query = e.target.value;
            setSearchQuery(query);
          }}
        />
        <ToolTip text='Advanced Options'>
          <Carot onClick={toggleSearchOptions}/>
        </ToolTip>
      </div>
      <Show when={showResultBox()}>
        <div class="resultbox">
          <ul>
            <For each={autoCompleteOptions()}>{(option) =>
              <li onClick={() => {
                setSearchQuery("")
                setAdvancedOptions([])
              }}>
                <img src={option.image}/>
                <span>{option.title}</span>
              </li>
            }</For>
          </ul>
        </div>
      </Show>
      <Show when={showOptions()}>
        <div class="search-options">
          <For each={advancedOptions()}>{(option, i) =>
            <div class="input-text">
              <input type={option.type} value={option.value} required/>
              <div class="underline"/>
              <label>{option.label}</label>
              <span>{option.helpText}</span>
            </div>
          }</For>
          <div class="search-buttons">
            <button>Clear</button>
            <button>Search</button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default SearchBar;
