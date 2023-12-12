export function getErrorString(err) {
  if (!err.message) return 'Unknown error has occurred';

  return err.message.replace('GraphQL error: ', '').replace(/;/g, '\n');
}
