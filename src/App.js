import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from './components/Header'
import Projects from './components/Projects'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {
    category: categoriesList[0].id,
    isLoading: false,
    data: [],
    showError: false,
  }

  componentDidMount() {
    this.getMyProjectsData()
  }

  onChangeDropDown = e => {
    this.setState({category: e.target.value}, this.getMyProjectsData)
  }

  failureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png "
        alt="failure view"
      />
      <h1>Opps! Something Went Wrong</h1>
      <p>We can`t seem to find the page you are looking for</p>
      <button type="button" onClick={this.getMyProjectsData}>
        Retry
      </button>
    </div>
  )

  getMyProjectsData = async () => {
    this.setState({isLoading: true})
    const {category} = this.state
    console.log(category)
    const url = `https://apis.ccbp.in/ps/projects?category=${category}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.projects.map(eachProject => ({
        id: eachProject.id,
        name: eachProject.name,
        imageUrl: eachProject.image_url,
      }))
      this.setState({data: updatedData, isLoading: false})
    } else {
      this.setState({isLoading: false, showError: true})
      this.failureView()
    }
  }

  render() {
    const {isLoading, data, showError} = this.state

    return (
      <>
        <Header />
        <div className="app-container">
          <select className="dropdown" onChange={this.onChangeDropDown}>
            {categoriesList.map(eachCategory => (
              <option key={eachCategory.id} value={eachCategory.id}>
                {eachCategory.displayText}
              </option>
            ))}
          </select>
          {isLoading ? (
            <div className="loader-container" data-testid="loader">
              <Loader />
            </div>
          ) : (
            <ul className="projects-list-container">
              {data.map(eachItem => (
                <Projects eachItem={eachItem} key={eachItem.id} />
              ))}
            </ul>
          )}
          {showError ? this.failureView : null}
        </div>
      </>
    )
  }
}

export default App
