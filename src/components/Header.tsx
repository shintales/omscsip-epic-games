import "./Header.css"
import EpicLogo from '../assets/epic-games-2.svg';
import AngleDown from '../assets/angle-down.svg';
import Globe from '../assets/globe.svg';
import AvatarProfile from '../assets/avatar-icon.svg';

export default () => {
    return (
      <header>
      <div class="left-section">
        <EpicLogo  class="logo" />
        <AngleDown class="icon-svg icon-svg-carot" />
        <div class="divider"/>
        <img src="https://media.graphassets.com/qAiDvosPSFGqJxTVuY7h" alt="Store" class="store-icon" />
        <nav class="nav">
          <a href="#" class="nav-item">News</a>
          <a href="#" class="nav-item">Distribution</a>
          <a href="#" class="nav-item">Support</a>
          <a href="@" class="nav-item">Unreal Engine</a>
        </nav>
      </div>
      <div class="right-section">
        <Globe class="icon-svg" />
        <AvatarProfile class="icon-svg" />
        <button class="download-button">Download</button>
      </div>
    </header>
    )
}