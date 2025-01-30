PIQUE Visualizer requires input data in a structured JSON format to assess and visualize software quality. This section explains the required structure and key components of the input file.

## Overview
A valid input JSON file contains essential elements such as `name`, `global_config`, `factors`, `measures`, and `diagnostics`. These components collectively define how the software’s quality is evaluated and presented in the visualizer.

### Core Structure
| Key               | Type      | Description |
|-------------------|-----------|-------------|
| `name`            | `string`  | Name of the dataset (e.g., project identifier). |
| `global_config`   | `object`  | Global settings that apply to the entire dataset. |
| `factors`         | `object`  | Hierarchical quality model consisting of top-level quality indicators and contributing factors. |
| `measures`        | `object`  | Measurable software quality attributes. |
| `diagnostics`     | `object`  | Low-level data used to derive measure values. |


## Key Components

### Factors
Factors represent higher-level software quality attributes, such as maintainability or security, and are calculated from measures.

- **Structure**: Nested objects defining `tqi` (total quality index), `quality_aspects`, and `product_factors`
- **Example**: 
```json
"factors": {
  "Maintainability": {
    "value": 0.8,
    "weights": { "Modularity": 0.6, "Readability": 0.4 }
  }
}
```

### Measures
Measures quantify specific aspects of software quality and are derived from diagnostics.

- **Fields**: `description`, `eval_strategy`, `normalizer`, `thresholds`, `utility_function`, `value`, and `weights`
- **Example**: 
```json
"measures": {
  "Code Complexity": {
    "value": 0.7,
    "eval_strategy": "static_analysis",
    "utility_function": "linear"
  }
}
```

### Diagnostics
Diagnostics provide raw data from analysis tools and serve as the foundation for measures.

- **Fields**: `description`, `eval_strategy`, `toolName`, `value`, and `weights`
- **Example**: 
```json
"diagnostics": {
  "Cyclomatic Complexity": {
    "value": 15,
    "toolName": "SonarQube"
  }
}
```

### Utility Functions
Utility functions determine how measure and factor values are interpreted. These can be simple (e.g., `linear`, `logarithmic`) or detailed with benchmarks.

- **Example**: 
```json
"utility_function": {
  "name": "benchmark_curve",
  "benchmarkQualityMetrics": [0.2, 0.5, 0.8]
}
```

## Input Validation

To ensure the JSON input works correctly with PIQUE Visualizer, adhere to the following validation rules:

### Required Fields
The following fields must be present in the JSON file:

- `name`: A string identifying the dataset (e.g., project name)
- `factors`: An object defining quality attributes and their weights
- `measures`: An object containing measurable quality attributes
- `diagnostics`: An object providing raw data used to calculate measures

### Data Types
Each field must match the expected data type:

- `name`: String
- `factors`, `measures`, `diagnostics`: Objects
- Numeric values (e.g., `value`, `weights`): Number

### Value Constraints
- **Normalized Values**: If normalized, measure and factor values must be between `0.0` and `1.0`
- **Weights**: For a given factor, the sum of weights must equal `1.0`

### Referential Integrity
- **Measures**: Must reference valid diagnostics
- **Factors**: Must reference valid measures

### JSON Formatting
Ensure the file is valid JSON:
- Use double quotes for strings
- Match all brackets (`{}`, `[]`) correctly
- Avoid trailing commas

By following these rules, you can ensure the input file is correctly processed by PIQUE Lite.


