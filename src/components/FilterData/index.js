import './index.css'

const FilterData = props => {
  const {
    employmentTypesList1,
    salaryRangesList1,
    updatedRadioFilter1,
    updatedCheckBoxFilter1,
  } = props

  const handleCheckboxChange = event => {
    const {id, checked} = event.target
    updatedCheckBoxFilter1(id, checked)
  }

  const handleRadioChange = event => {
    updatedRadioFilter1(event.target.id)
  }

  return (
    <div>
      <ul className="filter_data_unlist">
        {employmentTypesList1.map(each => (
          <li className="filter_data_list" key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>
      <hr />

      <h1 className="JobProfileSection_card2_heading">Salary Range</h1>
      <ul className="filter_data_unlist">
        {salaryRangesList1.map(each => (
          <li className="filter_data_list" key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.salaryRangeId}
              name="salary" // Ensure this is the same for all radio buttons in the group
              onChange={handleRadioChange}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterData
