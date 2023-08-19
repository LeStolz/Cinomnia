import "./CircularRate.scss";
type Value = {
  progress: number;
};

const CircularRate = ({ progress } : Value) => {
  const radius = 30; 
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 10) * circumference;
  const rate = (progress).toFixed(1); 

  return (
    <svg width="100" height="100">
      <circle
        className="progress-background"
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        strokeWidth="10"
      />
      <circle
        className="progress-circle"
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        strokeWidth="10"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
      />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="fw-bold">
        {rate}
      </text>
    </svg>
  );
};

export default CircularRate;
