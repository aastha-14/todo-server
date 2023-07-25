export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    // Process a POST request
    res.send('Hello world - Post method!');
  } else {
    // Handle any other HTTP method
    res.send('Hello world - Other Routes !');
  }
}