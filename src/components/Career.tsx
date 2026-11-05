import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analyst</h4>
                <h5>Insight Labs</h5>
              </div>
              <h3>20XX</h3>
            </div>
            <p>
              Built SQL reporting workflows and automated recurring analysis, giving product and operations teams a clearer view of customer behavior.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analyst</h4>
                <h5>Insight Labs</h5>
              </div>
              <h3>20XX</h3>
            </div>
            <p>
              Built SQL reporting workflows and automated recurring analysis, giving product and operations teams a clearer view of customer behavior.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analyst</h4>
                <h5>Insight Labs</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Built SQL reporting workflows and automated recurring analysis, giving product and operations teams a clearer view of customer behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
