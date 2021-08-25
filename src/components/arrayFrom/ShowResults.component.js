const sleep = ms => Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {
    await sleep(500);
    window.alert(`you submitted: \n\n${JSON.stringify(values, null, 2)}`);
})