import HomeHero from '../sections/home/HomeHero.jsx';
import RoleStrip from '../sections/home/RoleStrip.jsx';
import ProblemSection from '../sections/home/ProblemSection.jsx';
import WorkflowSection from '../sections/home/WorkflowSection.jsx';
import UseCaseGrid from '../sections/home/UseCaseGrid.jsx';
import StackSection from '../sections/home/StackSection.jsx';
import FaqSection from '../sections/home/FaqSection.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';

export default function HomePage({ page }) {
  const s = page.sections;
  const closing = s[6].blocks.filter((b) => b.type === 'body');
  return (
    <>
      <HomeHero section={s[0]} />
      <RoleStrip />
      <ProblemSection section={s[1]} />
      <WorkflowSection section={s[2]} />
      <UseCaseGrid section={s[3]} />
      <StackSection section={s[4]} />
      <FaqSection section={s[5]} />
      <CtaBand heading={closing[0].args[0]} description={closing[1].args[0]} />
    </>
  );
}
