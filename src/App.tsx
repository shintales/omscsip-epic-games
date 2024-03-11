import { type Component } from 'solid-js';

import styles from './App.module.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ScrollingTags from './components/ScrollingTags';
import NewsFeed from './components/NewsFeed';
import { Toaster } from 'solid-toast';

const App: Component = () => {
  return (
    <div>
      <Header/>
      <Toaster
        position="top-center"
        gutter={8}
      />
      <div class={styles.App}>
        <SearchBar/>
        <div>
          <ScrollingTags/>
          <NewsFeed/>
        </div>
      </div>
    </div>
  );
};

export default App;
