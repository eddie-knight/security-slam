---
title: Let's Make a Threat Catalog
description: Come learn with me as I start drafting a new Gemara threat assessment
tags: [Inspector, Gemara]
author: Eddie Knight
videoUrl: https://www.dropbox.com/scl/fi/versnlv0rxbfofuj6pibv/Let-s-Make-a-Threat-Catalog.mp4?rlkey=ozrrgnc7gj57b1nq87ggd5bji&st=yar7cpw4&raw=1
---

If you're not sure how to approach the _Inspector_ badge, this is how I started. I have some familiarity with the process, but it's been a while since I've done it, so in this video I talk through all the different considerations I have while starting from scratch with a new threat assessment.

This isn't an end-to-end walkthrough, but I anticipate it'll be a good kickstart for folks who follow along with their own projects.

Below are the final artifacts.

I've included some threats that are already mitigated. This allows me to reference these as known-threats when I create additional documentation, a self-assessment document, or a more complete threat model.

Note that for completion of the security slam badge, we do _not_ need to go as far as to do a comprehensive assessment. The point is to kickstart something that can be extended later.

## Initial Privateer SDK Threats

```yaml
---
title: Privateer SDK Self-Assessment
metadata:
  id: PrivProj.SDK
  description: Threat catalog for Privateer SDK Self-Assessment
  version: 2026.Feb.28
  author:
    id: pvtr-maintainers
    name: Privateer Maintainer Group
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases/download/v2025.10/CCC.Core_v2025.10.yaml
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.

capabilities:
  - id: PrivProj.SDK.CP01
    title: Go Package
    description: Privateer SDK is a go package, version controlled and released via GitHub and distributed by pkg.go.dev
  - id: PrivProj.SDK.CP02
    title: Plugin Development Kit
    description: Provides the foundational logic required for building the base of any Privateer plugin
  - id: PrivProj.SDK.CP03
    title: Shared Plugin Interfaces
    description: Standardizes data structures across diverse plugin implementations
  - id: PrivProj.SDK.CP04
    title: Configuration Management
    description: Manages plugin settings, environment variables, and configuration logic for Privateer (core) and plugins
  - id: PrivProj.SDK.CP05
    title: Evaluation Framework
    description: Orchestrates assessment logic to ensure consistent machine-readable validation

threats:
  - id: PrivProj.SDK.TH01
    title: Source Repository is Compromised
    description: |
      Access control failures on the source repository may result in distribution of compromised code,
      which will then compromise all downstream users.
    capabilities:
      - reference-id: PrivProj.SDK
        entries:
          - reference-id: PrivProj.SDK.CP01
          - reference-id: PrivProj.SDK.CP02
  - id: PrivProj.SDK.TH02
    title: Undetected Breaking Changes Disrupt Downstream Plugins
    description: |
      Syntactic or behavioral modifications to core interfaces or evaluation logic may disrupt 
      compatibility for existing plugins, leading to silent validation failures or logic errors 
      in security assessments.
    capabilities:
      - reference-id: PrivProj.SDK
        entries:
          - reference-id: PrivProj.SDK.CP02
          - reference-id: PrivProj.SDK.CP03
          - reference-id: PrivProj.SDK.CP05
  - id: PrivProj.SDK.TH03
    title: Supply Chain Contamination via Dependencies
    description: |
      The use of unvetted, unpinned, or compromised third-party Go modules can
      introduce vulnerabilities or malicious logic into the SDK and derived plugins.
    capabilities:
      - reference-id: PrivProj.SDK
        entries:
          - reference-id: PrivProj.SDK.CP01
```

## Initial Privateer CLI Threats

```yaml
---
title: Privateer CLI Self Assessment
metadata:
  id: PrivProj.CLI
  description: Threat catalog for Privateer CLI
  version: 2026.Feb.28
  author:
    id: pvtr-maintainers
    name: Privateer Maintainer Group
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases/download/v2025.10/CCC.Core_v2025.10.yaml
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.

imported-capabilities:
  - reference-id: CCC
    entries:
      - id: CCC.Core.CP10
        remarks: Log Publication (Privateer doesn't send logs, but does write to io and file)
      - id: CCC.Core.CP28
        remarks: Command-line Interface

imported-threats:
  - reference-id: CCC
    entries:
      - id: CCC.Core.TH07
        remarks: Logs are Tampered With or Deleted
      - id: CCC.Core.TH16
        remarks: Publications are Disabled

capabilities:
  - id: PrivProj.CLI.CP01
    title: User Configuration Ingestion
    description: |
      Accepts CLI inputs and reads user-provided YAML configuration files to determine
      runtime behavior for the core CLI and selected plugins
  - id: PrivProj.CLI.CP02
    title: Multi-plugin Variable Handling
    description: Manages configuration variables and secrets for all plugins that are executed
  - id: PrivProj.CLI.CP03
    title: Plugin Enumeration
    description: |
      Detects plugins available on the local filesystem by searching a well-known
      or user-defined location
  - id: PrivProj.CLI.CP04
    title: Plugin Execution
    description: |
      Executes one or more plugins as independent sub-processes and directs output
      to the terminal or filesystem
  - id: PrivProj.CLI.CP05
    title: Plugin Generation
    description: |
      Automates the generation of plugin scaffolding from Gemara Control Catalogs
      using the `generate-plugin` command
  - id: PrivProj.CLI.CP06
    title: Configurable Log Output
    description: Allows users to adjust the verbosity and location of log outputs
  - id: PrivProj.CLI.CP07
    title: Configurable Result Output
    description: Allows users to configure the output location for runtime execution results

threats:
  - id: PrivProj.CLI.TH01
    title: Plugin Binary Hijacking
    description: |
      Privateer discovers plugins in local directories. If an attacker gains write access to
      the plugin path, they can place a malicious binary that Privateer will execute.
      This may be used to feed inaccurate data into the victim's security scans,
      and/or compromise the target resource.
    capabilities:
      - reference-id: PrivProj.CLI
        entries:
          - reference-id: PrivProj.CLI.CP03
          - reference-id: PrivProj.CLI.CP04
  - id: PrivProj.CLI.TH02
    title: Config Secrets are Unintentionally Accessed by a Different Plugin
    description: |
      Privateer manages all variables, including secrets, in the same process. If users are running
      multiple plugins from different authors or contexts, sensitive variables intended for one
      context may become accessible to another plugin executed in the same run.
    capabilities:
      - reference-id: PrivProj.CLI
        entries:
          - reference-id: PrivProj.CLI.CP01
          - reference-id: PrivProj.CLI.CP02
  - id: PrivProj.CLI.TH03
    title: Sensitive Data Exposure via Insecure Configuration Permissions
    description: |
      Configuration files containing resource identifiers or sensitive metadata are stored on
      the local filesystem. In shared or improperly isolated environments, insecure file
      permissions can lead to the unauthorized exposure of these artifacts.
    capabilities:
      - reference-id: PrivProj.CLI
        entries:
          - reference-id: PrivProj.CLI.CP01
          - reference-id: PrivProj.CLI.CP07
  - id: PrivProj.CLI.TH04
    title: Unintentional Plugin Enumeration
    description: |
      If an attacker gains the ability to run Privateer CLI, even in a sandbox or ephemeral environment,
      and even without access to configuration data, they may be able to infer the contents of the
      victim's production environment by enumerating Privateer plugins.
  - id: PrivProj.CLI.TH05
    title: Insecure Defaults in Generated Scaffolding
    description: |
      If the templates used by the `generate-plugin` command contain insecure default settings or
      vulnerable boilerplate, all new plugins generated by the CLI will inherit these flaws,
      scaling the vulnerability across the ecosystem.
    capabilities:
      - reference-id: PrivProj.CLI
        entries:
          - reference-id: PrivProj.CLI.CP05
  - id: PrivProj.SDK.TH06
    title: Scaffolding Template Poisoning
    description: |
      Compromise of the `plugin-generator-templates` allows an attacker to inject malicious code or
      dependencies into the wireframes used by `generate-plugin`, tainting all new service packs at
      the time of creation.
    capabilities:
      - reference-id: PrivProj.SDK
        entries:
          - reference-id: PrivProj.CLI.CP05
```