import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const services = [
  {
    number: "01",
    title: "ANALYZE",
    subtitle: "From question to insight",
    description:
      "I explore messy datasets, find the signal, and communicate the patterns that help people make confident decisions.",
  },
  {
    number: "02",
    title: "MODEL",
    subtitle: "Predict what comes next",
    description:
      "I build practical, explainable models for forecasting, classification, and experimentation without losing sight of the people using them.",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX = 0;

    function setTranslateX() {
      const workFlex      = document.querySelector<HTMLElement>(".work-flex")!;
      const workContainer = document.querySelector<HTMLElement>(".work-container")!;
      const style         = window.getComputedStyle(workFlex);
      const marginLeft    = parseInt(style.marginLeft)  || 0;
      const paddingRight  = parseInt(style.paddingRight) || 0;
      const rectLeft      = workContainer.getBoundingClientRect().left;

      // Sum all direct children — works regardless of mixed widths
      const totalChildrenWidth = Array.from(workFlex.children as HTMLCollectionOf<HTMLElement>)
        .reduce((acc, child) => acc + child.getBoundingClientRect().width, 0);

      translateX = totalChildrenWidth + paddingRight + rectLeft + marginLeft - window.innerWidth;
    }

    setTranslateX();

    const workEl      = document.querySelector<HTMLElement>(".work-section");
    const afterEls    = document.querySelectorAll<HTMLElement>(".techstack, .contact-section");

    const showWork = () => {
      if (workEl) workEl.style.zIndex = "10";
      afterEls.forEach((el) => { el.style.visibility = "hidden"; el.style.pointerEvents = "none"; });
    };
    const hideWork = () => {
      if (workEl) workEl.style.zIndex = "";
      afterEls.forEach((el) => { el.style.visibility = ""; el.style.pointerEvents = ""; });
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        onEnter: showWork,
        onLeave: hideWork,
        onEnterBack: showWork,
        onLeaveBack: hideWork,
      },
    });

    tl.to(".work-flex", { x: -translateX, ease: "none" });

    return () => {
      hideWork();
      tl.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-flex">
          {services.map((service) => (
            <article className="work-box service-card" key={service.title}>
              <div className="work-title">
                <h3>{service.number}</h3>
                <h4>{service.title}</h4>
              </div>
              <div className="service-copy">
                <h5>{service.subtitle}</h5>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
