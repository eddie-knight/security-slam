---
title: "Cleaner Badge"
description: "Publish Security Insights YAML documentation"
path: "/library/cleaner"
badge: "Cleaner"
---

## Challenge

Complete Security Insights YAML documentation for your project

## Why?

Machines are fast and cheap, but they need clean, structured data to work with.

Security Insights enables tools like those we're using for Slam evaluation and, more importantly, it can be used by your regulated end-users who need to demonstrate due diligence to their auditors.

You've done the hard work of implementing security controls. Security Insights is just making sure everyone can rapidly find that work without having to dig through your codebase.

## How?

The Security Insights specification defines a YAML file that lives in your repository at `SECURITY-INSIGHTS.yml`. This file documents your security practices, tooling, and baseline progress in a standardized format.

### Getting Started

1. **Read the spec**: Check out the [Security Insights specification](https://github.com/ossf/security-insights-spec) to understand the required fields
2. **Create your file**: Add a `SECURITY-INSIGHTS.yml` file to the root of your repository
3. **Document your baseline progress**: Include fields that map to OSPS Baseline controls you've completed
4. **Validate**: Use the Security Insights tooling to ensure your YAML is well-formed and complete

If it's not live by the time you're reading this, we'll soon have a Slam Library resource to talk more about Security Insights. Feel free to shot questions out to Slam Advisors if you get hung up in the meantime.

### What to Include

At minimum, your Security Insights file should document:

- Security contacts and vulnerability reporting process
- Security-related development practices (code review, testing, etc.)
- Build and release processes
- Dependencies and supply chain security practices
- Any automated security tooling in use

The more complete your documentation, the easier it is for evaluators and adopters to build confidence in your project's security posture.

### Pro Tips

- Your Security Insights file should evolve as your documentation and practices mature
- Where possible, link to published artifacts that demonstrate your claims
- Be honest: It helps your users way more if you document what you're _actually_ doing than to link to incomplete resources or practices you haven't implemented yet
