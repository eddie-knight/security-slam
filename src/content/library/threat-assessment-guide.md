---
title: Threat Assessment Guide
description: Step-by-step guide to performing Gemara-compatible threat assessments
tags: ["Assessment", "Security", "GRC-Engineering"]
---

## What This Is

This guide walks through a threat assessment using the [Gemara](https://gemara.openssf.org/) project.

**The basic idea:** Think of a project like a house. First, you identify what the house can do: its **capabilities** (e.g., "allow entry/exit", "store belongings"). Then, you identify **threats**, what could go wrong with those capabilities (e.g., "unauthorized entry through unlocked door", "theft of stored belongings").

In technical terms:
* **Capabilities** define what the technology can do. These comprise a primary component of the **attack surface** or the points where an actor could potentially cause harm.
* **Threats** define specific ways those capabilities could be misused or exploited.

This exercise helps you systematically identify what could go wrong so you can build appropriate defenses.

## Walkthrough

### Step 0: Define Scope

Select a component or technology to assess (service, API, infrastructure component, or technology stack).

#### Don't Start From Scratch

The Gemara schemas support importing threats and capabilities from other catalogs.

The FINOS Common Cloud Controls (CCC) Core [catalog](https://github.com/finos/common-cloud-controls/releases/download/v2025.10/CCC.Core_v2025.10.yaml) defines capabilities and threats that apply broadly across cloud services. This catalog contains well-vetted items that you would otherwise need to write from scratch. When you choose your assessment target, you can decide if these pre-built items apply.

We will explore how this is leveraged below as we dive into our container management tool example (i.e., SEC.SLAM.CM).

### Step 1: Setting Up Metadata

Declare your scope and mapping references. Key fields:

| Field                               | What It Is                                                    | Why                                                                                       |
|-------------------------------------|---------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| `mapping-references` with `id: CCC` | A pointer to the CCC Core catalog release                     | Tells parsers where to resolve the imported capability and threat IDs used in later steps |
| `imported-capabilities` (Step 2)    | Specific CCC Core capabilities by ID (e.g., `CCC.Core.CP06`) | Brings in common capabilities without redefining them                                     |
| `imported-threats` (Step 3)         | Specific CCC Core threats by ID (e.g., `CCC.Core.TH01`)      | Brings in common threats without redefining them                                          |

**Example (YAML):**

```yaml
metadata:
  id: SEC.SLAM.CM
  description: Threat catalog for container management tool security assessment
  version: 1.0.0
  author:
    id: example
    name: Example
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.
    - id: MITRE-ATT&CK
      title: MITRE ATT&CK Framework
      version: "16.0"
      description: |
        MITRE ATT&CK® is a globally-accessible knowledge base of adversary
        tactics and techniques based on real-world observations.
      url: https://attack.mitre.org/
```

### Step 2: Identify Capabilities

Capabilities are the core functions or features within the scope.

**Start with the imported capabilities** you can leverage from FINOS CCC. Ask: "Which common cloud capabilities does this technology have?"

A container management tool actively reaches out to registries to pull images and configuration.
Since CCC Core already defines this as **CP29** (Active Ingestion), we import it rather than redefining it.

**Example (YAML)**

```yaml
imported-capabilities:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.CP29
        remarks: Active Ingestion
```

**Then, define service-specific capabilities** unique to your target. Required fields:

| Field         | Required | Description                                                        | Example                                                                                                   |
|---------------|----------|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| Capability ID | Yes      | Unique identifier following the pattern `ORG.PROJ.COMPONENT.CAP##` | `SEC.SLAM.CM.CAP01`                                                                                       |
| Title         | Yes      | A clear, concise name that describes the capability                | "Image Retrieval by Tag"                                                                                  |
| Description   | Yes      | A specific explanation of what this capability does                | "Ability to retrieve container images from registries using mutable tag names (e.g., 'latest', 'v1.0').." |

**Example (YAML)**

```yaml
capabilities:
  - id: SEC.SLAM.CM.CAP01
    title: Image Retrieval by Tag
    description: |
      Ability to retrieve container images from registries using mutable tag names
      (e.g., 'latest', 'v1.0').
```

**Note:** This is a minimal example. Real assessments import several CCC Core capabilities and define multiple service-specific capabilities (e.g., networking, storage, authentication, lifecycle management, configuration) that together define the complete attack surface.

### Step 3: Identify Threats

Threats are specific ways capabilities can be misused, exploited, or cause problems. For each capability, identify potential threats.

**Start with the imported threats** you can leverage from FINOS CCC. Ask: "Which common cloud threats apply to the capabilities you imported?"

We imported **CP29** (Active Ingestion) in Step 2. CCC Core defines **TH01** (Access is Granted to Unauthorized Users) as a potential consequence of this capability. If ingestion is not properly authenticated, an unauthorized actor could trigger the tool to pull from untrusted sources, resulting in TH01.

**Example (YAML)**

```yaml
imported-threats:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.TH01
        remarks: Access is Granted to Unauthorized Users
```

**Then, define service-specific threats** unique to your target. Required fields:

| Field             | Required | Description                                                                        | Example                                           |
|-------------------|----------|------------------------------------------------------------------------------------|---------------------------------------------------|
| Threat ID         | Yes      | Unique identifier following the pattern `ORG.PROJ.COMPONENT.THR##`                 | `SEC.SLAM.CM.THR01`                               |
| Title             | Yes      | A clear, concise name describing the threat                                        | "Container Image Tampering or Poisoning" |
| Description       | Yes      | A specific explanation of what goes wrong and why it matters                       | See YAML example below                            |
| Capabilities      | Yes      | Links this threat to the capability(ies) it exploits                               | See YAML example below                            |
| External Mappings | No       | Optional links to industry standards like MITRE ATT&CK (useful for security teams) | See YAML example below                            |

**Example (YAML)**

```yaml
threats:
  - id: SEC.SLAM.CM.THR01
    title: Container Image Tampering or Poisoning
    description: |
      Attackers may replace a legitimately published image tag with a malicious image
      by exploiting tag mutability in image registries, especially when the container
      management tool retrieves images by tag name rather than digest. This enables
      unauthorized access, data exfiltration, and system compromise.
    capabilities:
      - reference-id: SEC.SLAM.CM
        entries:
          - reference-id: SEC.SLAM.CM.CAP01
    external-mappings:
      - reference-id: MITRE-ATT&CK
        entries:
          - reference-id: T1195.002
            remarks: Compromise Software Supply Chain
          - reference-id: T1204.003
            remarks: Malicious Image
```

**Note:** This is a minimal example. Real assessments import several CCC Core threats alongside multiple service-specific threats per capability (e.g., exploitation of vulnerable base images, unauthorized access via exposed secrets, supply chain compromise).

### Step 4: Validate

The final YAML should look something like this:
```yaml
metadata:
  id: SEC.SLAM.CM
  description: Threat catalog for container management tool security assessment
  version: 1.0.0
  author:
    id: example
    name: Example
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.
    - id: MITRE-ATT&CK
      title: MITRE ATT&CK Framework
      version: "16.0"
      description: |
        MITRE ATT&CK® is a globally-accessible knowledge base of adversary
        tactics and techniques based on real-world observations. The ATT&CK
        knowledge base is used as a foundation for the development of specific
        threat models and methodologies in the private sector, in government,
        and in the cybersecurity product and service community.
      url: https://attack.mitre.org/
title: Container Management Tool Security Threat Catalog
imported-capabilities:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.CP29
        remarks: Active Ingestion
capabilities:
  - id: SEC.SLAM.CM.CAP01
    title: Image Retrieval by Tag
    description: |
      Ability to retrieve container images from registries using mutable tag names
      (e.g., 'latest', 'v1.0').
imported-threats:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.TH01
        remarks: Access is Granted to Unauthorized Users
threats:
  - id: SEC.SLAM.CM.THR01
    title: Container Image Tampering or Poisoning
    description: |
      Attackers may replace a legitimately published image tag with a malicious image
      by exploiting tag mutability in image registries, especially when the container
      management tool retrieves images by tag name rather than digest. This enables
      unauthorized access, data exfiltration, and system compromise.
    capabilities:
      - reference-id: SEC.SLAM.CM
        entries:
          - reference-id: SEC.SLAM.CM.CAP01
    external-mappings:
      - reference-id: MITRE-ATT&CK
        entries:
          - reference-id: T1195.002
            remarks: Compromise Software Supply Chain
          - reference-id: T1204.003
            remarks: Malicious Image
```

**Validation commands:**

```bash
go install cuelang.org/go/cmd/cue@latest
cue vet -c -d '#ThreatCatalog' github.com/gemaraproj/gemara@latest your-threats.yaml
```

## What's Next

Create a Gemara Control Catalog that maps security controls to the identified threats, providing a structured approach to defining mitigations.