import './App.css';
import { createWalletByMenmonic, setEncryptionKeyFromPassword } from './modules/wallet/createWallet';
import './modules/wallet/initWallet'
import { Button } from 'antd'
import { Mnemonic, randomBytes } from "ethers";


function App() {
  const handleCreate = async () => {
    const mnemonic = Mnemonic.fromEntropy(randomBytes(24)).phrase.trim();
  
    const e = await setEncryptionKeyFromPassword("123456");
    console.log("mnemonic", mnemonic);
    const info = await createWalletByMenmonic(mnemonic, e);
    debugger;
    console.log("info", info);
  }
  return (
    <div className="App">
      <Button type="primary">Connect</Button>
      <Button type='primary' onClick={handleCreate}>Create Wallet</Button>
    </div>
  );
}

export default App;
