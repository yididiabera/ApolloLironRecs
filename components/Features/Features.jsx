import "./Features.css";

const Features = ({title, description, image, isLeft}) => {
  return (
    <div className="features-main">
        <div style={isLeft ? {flexDirection: 'row-reverse'} : {}} className="features-container">
            <img src={image} alt="Feature" className="features-image"/>
            <div className="features-text-container">
                <h2 className="features-heading">{title}</h2>
                <p className="features-description">{description}</p>
            </div>
        </div>
    </div>
  )
}

export default Features
