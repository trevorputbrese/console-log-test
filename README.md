# Console Log Test

A [Next.js](https://nextjs.org) application designed to be deployed to **Cloud Foundry** using `cf push`.

## Overview

<!-- This app is a Cloud Foundry deployment target used to validate:
     - Next.js running on CF with the nodejs_buildpack
     - Reading CredHub service credentials via VCAP_SERVICES
     - Console.log output appearing in CF container logs -->

This app includes:

- A user search API route at `api/search/[query]` with mock data
- CredHub service integration — reads credentials from `VCAP_SERVICES` and logs them
- Console.log statements for validating CF log output via `cf logs`

## Getting Started

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deploy to Cloud Foundry

Make sure you are logged in to your CF target, then:

```bash
cf push
```

The `manifest.yml` is preconfigured with the `nodejs_buildpack` and binds to the `credhub-test` service instance.

To tail logs after deploying:

```bash
cf logs console-log-test
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
