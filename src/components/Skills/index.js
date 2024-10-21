import './index.css'

const Skill = props => {
  const {each1} = props
  return (
    <li className="list_skills">
      <img src={each1.imageUrl} className="image_skills" alt={each1.name} />
      <p className="image_para_skills">{each1.name}</p>
    </li>
  )
}
export default Skill
