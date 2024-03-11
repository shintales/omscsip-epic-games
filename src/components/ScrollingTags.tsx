import { createEffect, createMemo, createSignal, For, onCleanup, Show } from 'solid-js';
import AngleLeft from "../assets/angle-left.svg";
import AngleRight from "../assets/angle-right.svg";
import './ScrollingTags.css';

export default () => {
  let scrollRef: HTMLDivElement | undefined;
  const [tags, setTags] = createSignal([
    { name: "For You", isActive: true },
    { name: "Popular", isActive: false },
    { name: "Entertainment", isActive: false },
    { name: "Technology", isActive: false },
    { name: "ESports", isActive: false },
    { name: "Pokemon", isActive: false },
    { name: "Action-Adventure", isActive: false },
    { name: "Metroidvania", isActive: false },
    { name: "Reviews", isActive: false },
    { name: "Upcoming Release", isActive: false },
    { name: "RPG", isActive: false },
    { name: "Developer Stories", isActive: false },
    { name: "Game Updates", isActive: false },
    { name: "Unreal Engine", isActive: false },
    { name: "FPS", isActive: false },
  ])
  const [isAtStartOfScrollbar, setIsAtStartOfScrollbar] = createSignal(true);
  const [isAtEndOfScrollbar, setIsAtEndOfScrollbar] = createSignal(false);

  const sortedTags = createMemo(() => 
    tags().sort((a, b) => Number(b.isActive) - Number(a.isActive))
  );

  const toggleTagActive = (tagName: string) => {
    setTags(tags => tags.map(tag => 
      tag.name === tagName ? { ...tag, isActive: !tag.isActive } : tag
    ));
  };

  const scrollLeft = () => {
    if (scrollRef) {
      scrollRef.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    if (scrollRef) {
      scrollRef.scrollLeft += 100;
    }
  };

  const handleScroll = () => {
    if (!scrollRef) return;

    const isAtStart = scrollRef.scrollLeft === 0;
    const isAtEnd = (scrollRef.scrollWidth - scrollRef.scrollLeft) <= scrollRef.clientWidth;
    
    console.log(scrollRef.scrollLeft)
    console.log(scrollRef.scrollWidth)
    console.log(scrollRef.clientWidth)
    setIsAtStartOfScrollbar(isAtStart);
    setIsAtEndOfScrollbar(isAtEnd);
  };

  createEffect(() => {
    const element = scrollRef;
    element?.addEventListener('scroll', handleScroll);

    onCleanup(() => element?.removeEventListener('scroll', handleScroll));
  });
  return (
    <div class='scrollContainer'>
      <Show when={!isAtStartOfScrollbar()}>
        <button class="scrollButton left" onClick={scrollLeft}><AngleLeft/></button>
      </Show>
      <div class="scrollingWrapper" ref={scrollRef}>
        <For each={sortedTags()}>{(tag, i) =>
          <div classList={{
            tag: true,
            active: tag.isActive
           }} onClick={() => toggleTagActive(tag.name)}>{tag.name}</div>
        }</For>
      </div>
      <Show when={!isAtEndOfScrollbar()}>
        <button class="scrollButton right" onClick={scrollRight}><AngleRight/></button>
      </Show>
    </div>
  );
};