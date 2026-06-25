import '../scss/index.scss';
import './modules/burger';
import './modules/slider';
import './modules/pagination';

console.log(`
self-assessment - 120 / 120.
Burger menu (25 / 25)
 - The menu opens by clicking the burger icon +5
 - The menu opens with a smooth animation +5
 - The burger icon transforms into a close icon when the menu is open +5
 - The menu closes when clicking the close icon, the overlay area outside the menu, or any navigation link inside it +5
 - The page behind the menu does not scroll while the menu is open +5
Infinite carousel slider on Main (40 / 40)
 - The slider displays the correct number of cards per breakpoint: 3 / 2 / 1 +5
 - The slider has working left and right arrow controls +5
 - After a switch, the next group contains no pet from the previously visible group +10
 - All pets within the next group are unique +5
 - The order of cards in the next group is random within the above rules +5
 - Card switching is animated (slide) +5
 - During the slide animation, additional arrow clicks are ignored - animations do not stack +5
Pagination on Pets (40 / 40)
 - The block contains 48 cards: 6 pages × 8 on desktop, 8 × 6 on tablet, 16 × 3 on mobile +10
 - The 48 cards are built from pets.json so that all pets appear an equal number of times +5
 - No two adjacent cards (in linear order) show the same pet +5
 - Pagination controls present: first, previous, current page indicator, next, last +5
 - Disabled controls (e.g. "previous" on page 1) are visually inactive and don't respond to clicks +5
 - Page switching is animated +10
Popup (15 / 15)
 - Clicking a pet card opens a popup with that pet's details from pets.json +5
 - The popup has a darkened backdrop covering the page, and closes when clicking the close button or the backdrop area outside the popup +5
 - The page behind the popup does not scroll while the popup is open +5
`);