# Adding Projects to Your Portfolio

This portfolio now uses a dynamic system to load projects from a JSON file instead of hardcoding them in HTML. This makes it much easier to add, edit, or remove projects.

## How to Add a New Project

### 1. Add Project Images
First, create a folder in the `assets/` directory for your project images:
```
assets/
  your-project-name/
    1.png
    2.png
    3.png
    ...
```

### 2. Update the JSON File
Open `projects-data.json` and add a new project object to the `projects` array:

```json
{
  "id": "unique-project-id",
  "name": "Your Project Name",
  "description": "A brief description of your project",
  "image": "assets/your-project-name/1.png",
  "galleryFolder": "your-project-name",
  "technologies": ["Flutter", "Firebase", "GetX"],
  "githubUrl": "https://github.com/yourusername/your-repo",
  "isLocked": false,
  "featured": true
}
```

### 3. Project Properties Explained

- **id**: A unique identifier for the project (use kebab-case)
- **name**: The display name of your project
- **description**: A brief description that appears on the project card
- **image**: Path to the main project image (usually the first image)
- **galleryFolder**: The folder name in assets/ where your project images are stored
- **technologies**: Array of technologies used in the project
- **githubUrl**: GitHub repository URL (set to `null` if you want to lock the code)
- **isLocked**: Set to `true` to show a locked "View Code" button
- **featured**: Set to `true` to display the project (you can use this to hide projects)

### 4. Special Cases

#### Locked Projects
If you want to show a project but not make the code public, set:
```json
{
  "githubUrl": null,
  "isLocked": true
}
```

#### Hidden Projects
To temporarily hide a project without deleting it:
```json
{
  "featured": false
}
```

## Example: Adding a New Project

Let's say you want to add a "Weather App" project:

1. **Create the folder**: `assets/weather-app/`
2. **Add images**: `1.png`, `2.png`, `3.png`
3. **Update JSON**:
```json
{
  "id": "weather-app",
  "name": "Weather App",
  "description": "A beautiful weather application with real-time updates",
  "image": "assets/weather-app/1.png",
  "galleryFolder": "weather-app",
  "technologies": ["Flutter", "API", "Provider"],
  "githubUrl": "https://github.com/yourusername/weather-app",
  "isLocked": false,
  "featured": true
}
```

## Benefits of This System

- ✅ **Easy to maintain**: No need to edit HTML code
- ✅ **Consistent styling**: All projects use the same template
- ✅ **Flexible**: Easy to reorder, hide, or modify projects
- ✅ **Error handling**: Graceful fallback if JSON file can't be loaded
- ✅ **Performance**: Images load lazily for better performance

## Troubleshooting

- **Images not showing**: Check that the image paths in the JSON match your actual file structure
- **Gallery not working**: Ensure the `galleryFolder` name matches your assets folder name
- **Projects not loading**: Check the browser console for JSON parsing errors
- **Locked buttons not working**: Make sure `isLocked` is set to `true` and `githubUrl` is `null`

## File Structure
```
your-portfolio/
├── assets/
│   ├── project-1/
│   ├── project-2/
│   └── ...
├── projects-data.json
├── index.html
├── script.js
└── style.css
```
