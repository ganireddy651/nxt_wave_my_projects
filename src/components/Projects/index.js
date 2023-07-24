import './index.css'

const Projects = props => {
  const {eachItem} = props

  const {name, imageUrl} = eachItem

  return (
    <li>
      <div className="project-card">
        <img className="project-image" src={imageUrl} alt={name} />
        <div className="project-name-container">
          <h1 className="project-name">{name}</h1>
        </div>
      </div>
    </li>
  )
}

export default Projects
