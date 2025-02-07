PIQUE-Lite requires structured JSON input data to assess and visualize software quality. This section outlines the required structure and key components of the input file.

## Input Schema

A valid JSON file for PIQUE includes factors, measures, and diagnostics. If the file is invalid, an error message appears. Users upload multiple versions to track software quality over time, with data automatically visualized on the dashboard.

## JSON Structure

The input JSON follows a hierarchical structure:

- **Top Level**:
    - **`name`**: `"Binary Security Quality"`. Represents the total computed quality
    - **`value`**: Numeric value representing the overall quality score
    - **`children`**: Array of **Quality Aspects**
    - **(optional) `date`**: A date property can be included at the top level of the JSON structure to indicate when the data was generate

- **Quality Aspects**:
    - **`name`**: Name of the quality aspect (e.g., `"Availability"`)
    - **`value`**: Numeric value for the quality aspect
    - **`children`**: Array of **Product Factors**

- **Product Factors**:
    - **`name`**: CWE number (e.g., `"CWE-1211"`). Represents a specific weakness (e.g., `"Authentication Errors"`). See the Factors section for more info on CWE
    - **`value`**: Numeric value for the factor
    - **`children`**: Array of **Measures**

- **Measures**:
    - **`name`**: Name of the measure (e.g., `"CVE-CWE-294 Measure"`)
    - **`value`**: Numeric value for the measure
    - **`children`**: Array of **Diagnostics**

- **Diagnostics**:
    - **`name`**: Name of the diagnostic (e.g., `"CVE-CWE-294 Diagnostic"`)
    - **`value`**: Numeric value for the diagnostic


### Example JSON

```json
{
  "name": "Binary Security Quality",
  "value": 0.32076907778360153,
  "children": [
    {
      "name": "Availability",
      "value": 0.3517824935577334,
      "children": [
        {
          "name": "Category CWE-1211",
          "value": 0.1592293,
          "children": [
            {
              "name": "CVE-CWE-294 Measure",
              "value": 0.5,
              "children": [
                {
                  "name": "CVE-CWE-294 Diagnostic",
                  "value": 0
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "date": "2022-01-29"
}
```

### Structure of the Quality Model

The quality model is organized hierarchically, with the following structure:

- **6 Quality Aspects**: Represent high-level security characteristics:
    - `"Availability"`
    - `"Authenticity"`
    - `"Authorization"`
    - `"Confidentiality"`
    - `"Non-repudiation"`
    - `"Integrity"`
- **42 Factors per Quality Aspect**: Represent specific weaknesses or sub-characteristics (e.g., `"CWE-1211"` meaning `"Authentication Errors"`)
- **19 Measures per Factor**: Quantify specific aspects of software quality (e.g., `"CVE-CWE-294 Measure"`)
- **1 Diagnostic per Measure**: Provide raw data from analysis tools (e.g., `"CVE-CWE-294 Diagnostic"`)

This structure ensures a comprehensive evaluation of software quality, from high-level attributes to low-level tool findings.

## Key Components

### Factors

Factors are high-level, abstract concepts in the quality model that represent software quality attributes. They are not directly measurable but are calculated by aggregating values from lower-level components (measures). Factors are organized hierarchically:

- **Total Quality Index (TQI)**: 
    - The root node of the model
    - Represents the overall software quality score (e.g., 0.75 on a scale of 0.0 to 1.0)
    - Example: If the TQI is 0.8, the software is considered high quality
- **Quality Aspects (QA)**: 
    - The highest-level factors that directly compose the TQI (e.g., `"Confidentiality"`, `"Authentication"`)
- **Product Factors (PF)**: 
    - Factors one level below quality aspects
    - Product factors are represented by CWE (Common Weakness Enumeration) numbers. For example, `CWE-1211` represents `"Authentication Errors"`. Learn more about specific weaknesses by searching for the CWE ID on the <a href="https://cwe.mitre.org/" target="_blank" rel="noopener noreferrer">CWE Website</a>

### Measures

Measures are concrete, quantifiable concepts derived from diagnostics. They can be:

- **Positive Measures**: Findings that positively impact the TQI
- **Negative Measures**: Findings that negatively impact the TQI

### Diagnostics

Diagnostics are the raw outputs from analysis tools. They provide the foundational data used to calculate measures. Diagnostics are tool-specific and represent specific findings (e.g., a vulnerability or code smell)


