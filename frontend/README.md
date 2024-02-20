# Research Data Management App

This application serves as a comprehensive tool for managing research data and metadata in the field of [Your Domain/Research Area]. It offers functionalities for organizing, visualizing, and analyzing research data, making it easier for researchers to manage their projects effectively.

## Summary

The Research Data Management App provides a centralized dashboard for overviewing key metrics, managing projects, samples, annotations, methods, and references. Users can register datasets, annotate metadata, search for relevant data, and visualize metadata attributes graphically.

## Pages

1. **Dashboard:**
   - Central hub for overviewing key metrics and visualizations.
   - Provides insights into total data entries, annotations, methods, and references.
   - Offers functionalities for managing projects, samples, annotations, methods, and references.

2. **Projects, Samples, Annotations, Methods, References Pages:**
   - Modules for managing different aspects of research data.
   - Allows CRUD operations for managing projects, samples, annotations, methods, and references.

3. **Register Dataset Form Page:**
   - Form interface for registering datasets with metadata annotations.
   - Validates and saves dataset information to the database.

4. **Metadata Annotation Form Page:**
   - Manages metadata annotations for datasets.
   - Allows adding, editing, or deleting metadata annotations.

5. **Metadata Search Page:**
   - Enables users to search for relevant data based on metadata attributes.
   - Provides search filters for refining search results.

6. **Metadata Visualization Page:**
   - Provides visualization tools to explore metadata graphically.
   - Offers graphical representation of metadata attributes using charts or graphs.

## Technology Used

- **Frontend:**
  - React.js: JavaScript library for building user interfaces.
  - Ant Design: UI library for React with a set of high-quality components.

- **Backend:**
  - Python: Programming language used for backend development.
  - Flask: Micro web framework for building web applications in Python.
  - MongoDB: NoSQL database for storing and managing research data.

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install` for frontend and `pip install -r requirements.txt` for backend.
3. Start the backend server using `python app.py`.
4. Start the frontend server using `npm start`.
5. Open your browser and navigate to `http://localhost:3000`.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## License

This project is licensed under the [MIT License](LICENSE).