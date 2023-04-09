import './index.css'

const GeneresSlider = props => {
  const {Generes} = props
  const {id, name} = Generes
  return (
    <li key={id}>
      <p className="GeneresSlider-name">{name}</p>
    </li>
  )
}

export default GeneresSlider
