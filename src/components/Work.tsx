import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";

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
  {
    number: "03",
    title: "DATA ANALYSIS",
    subtitle: "Turn data into direction",
    description:
      "I clean, connect, and investigate complex data so teams can understand what is happening and decide what to do next.",
  },
  {
    number: "04",
    title: "MACHINE LEARNING",
    subtitle: "Build useful intelligence",
    description:
      "I develop reliable machine learning workflows that balance measurable performance with clarity, maintainability, and real-world value.",
  },
  {
    number: "05",
    title: "DATA VISUALIZATION",
    subtitle: "Make the signal visible",
    description:
      "I design clear dashboards and visual stories that make trends, relationships, and opportunities easy to understand.",
  },
  {
    number: "06",
    title: "EXPERIMENTATION",
    subtitle: "Learn what works",
    description:
      "I use thoughtful experiments and evaluation to turn assumptions into evidence and improve products with confidence.",
  },
];

const Work = () => {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".service-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

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
        <h2 className="work-heading">
          What <span>I Do</span>
        </h2>
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
