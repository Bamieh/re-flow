import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './Container';

const jobsDetailsQuery = gql`
query JobsDetailsQuery($jobID: ID!) {
  job(id: $jobID) {
    targetBranch
    trigger
    numberOfThreads
    id
    numberOfFlows
    flows {
      id
      title
      result
      failures
      pending
      passes
    }
  }
}
`;

export default graphql(jobsDetailsQuery, {
  skip: (props) => typeof props.jobID !== "string",
  // props.match.params.flowID
  options: (props) => ({
    variables: { jobID: props.jobID },
  }),
})(Container);