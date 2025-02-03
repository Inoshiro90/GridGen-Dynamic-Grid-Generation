# GridGen – Dynamic Grid Generation

## Project Description  
GridGen is a web-based tool designed to generate more natural-looking city maps for tabletop role-playing games (TTRPGs). Traditional square grids often appear too rigid and artificial, which can disrupt the immersive experience of world-building.  

To address this, GridGen introduces **point displacement based on rotation patterns**, allowing users to create dynamic and organic layouts. By adjusting grid dimensions and point spacing, users can design unique and varied map structures that better reflect natural city growth.  

The generated maps can be exported as **SVG or PNG** files, making them easy to integrate into virtual tabletop platforms or print for physical use.  

## How It Works  
GridGen dynamically generates a grid-based structure with displaced points using rotation patterns. The application follows these steps:  

1. **User Input Collection**  
   - The user specifies grid dimensions (width, length), point spacing, and units (mm, in, px).  
   - Additional parameters like line width and DPI are set for export.  

2. **Event Listeners & Input Handling**  
   - JavaScript listens for input changes and updates the grid dynamically.  
   - Clicking the **Generate** button triggers the grid generation process.  

3. **Grid Calculation & Pattern Application**  
   - The script calculates the grid dimensions based on user input.  
   - It applies **rotation patterns** to shift points and create an organic layout.  
   - A structured table of point connections is generated.  

4. **SVG Grid Rendering**  
   - A new SVG container is created, with the correct scaling based on DPI and units.  
   - The grid is drawn by connecting calculated coordinates with lines.  

5. **Displaying the Grid**  
   - The generated SVG is embedded into the UI for preview.  
   - The user can see different variations by adjusting parameters and regenerating the grid.  

6. **Exporting the Grid**  
   - Users can download the grid in **SVG** format for further customization.  
   - PNG exports are also available, generated via an HTML `<canvas>` element.  
   - A batch download option allows exporting multiple grids as a ZIP file.  

This process ensures flexibility in generating dynamic, non-static grid layouts for **TTRPG maps, city planning, and procedural pattern design**.  
