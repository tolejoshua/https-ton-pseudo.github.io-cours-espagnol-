import { ScrollVideo } from './components/ScrollVideo';
import { Navbar } from './components/Navbar';
import { SectionOne } from './components/SectionOne';
import { SectionTwo } from './components/SectionTwo';
import { HERO_POSTER_URL, HERO_VIDEO_URL } from './assets';

export default function App() {
  return (
    <div className="relative">
      <ScrollVideo src={HERO_VIDEO_URL} poster={HERO_POSTER_URL} />
      <div className="relative z-10">
        <Navbar />
        <main>
          <SectionOne />
          {/* Espace qui laisse au scroll le temps de faire défiler la vidéo entre les deux sections */}
          <div className="h-[80vh]" aria-hidden="true" />
          <SectionTwo />
        </main>
      </div>
    </div>
  );
}
