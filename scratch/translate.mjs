import translate from 'google-translate-api-x';

async function test() {
  try {
    const res = await translate('Hello world, this is a test.', { to: 'hi' });
    console.log(res.text);
  } catch (err) {
    console.error(err);
  }
}
test();
