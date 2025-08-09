import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllTools from "./pages/AllTools";
import BuyCoffee from "./pages/BuyCoffee";
import TextCaseConverter from "./tools/Text/TextCaseConverter";
import LoremIpsumGenerator from "./tools/Text/LoremIpsumGeneretor";
import TextCounter from "./tools/Text/TextCounter";
import MultipleWhiteSpaceRemover from "./tools/Text/MultipleWhiteSpaceRemover";
import CurrencyConverter from "./tools/utility/CurrencyConverter";
import QrCodeGenerator from "./tools/utility/QRCodeGenerator";
import LengthConverter from "./components/LengthConverter";
import UnitConverterLayout from "./Layout/UnitConverterLayout";
import TempretureConverter from "./components/TempretureConverter";
import TimeConverter from "./components/TimeConverter";
import AreaConverter from "./components/AreaConverter";
import MassConverter from "./components/MassConverter";
import ImageCompressor from "./tools/image/ImageCompressor";
import PasswordGenerator from "./tools/utility/PasswordGenerator";
import Base64Tabs from "./components/Base64Tabs";
import TextDiffChecker from "./tools/Text/TextDiffChecker";
import UrlEncoderDecoder from "./tools/Text/URLEncoderDecoder";
import JsonValidator from "./tools/Development/JsonValidator";
import TimestampConverter from "./tools/utility/TimestampConverter";
import GradientGenerator from "./tools/utility/GradientGenerator";
import Contact from "./pages/Contact.jsx";



const App = () => {
  return (
    <div className="min-h-screen">
      {<Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tools" element={<AllTools />} />
          <Route path="/buycoffee" element={<BuyCoffee/>}/>
          <Route path="/tools/text/text-case-converter" element={<TextCaseConverter/>}/>
          <Route path="/tools/text/lorem-ipsum-generator" element={<LoremIpsumGenerator/>}/>
          <Route path="/tools/text/text-counter" element={<TextCounter/>}/>
          <Route path="/tools/text/multiple-whitespace-remover" element={<MultipleWhiteSpaceRemover/>}/>
          <Route path="/tools/text/text-diff-checker" element={<TextDiffChecker/>}/>
          <Route path="/tools/color/gradient-generator" element={<GradientGenerator/>}/>
          <Route path="/tools/utility/currency-converter" element={<CurrencyConverter/>} />
          <Route path="/tools/utility/timestamp-converter" element={<TimestampConverter/>} />
          <Route path="/tools/utility/qr-code-generator" element={<QrCodeGenerator/>} />
          <Route path="/tools/utility/unit-converter" element={<UnitConverterLayout/>}>
              <Route index element={<Navigate to="/tools/utility/unit-converter/length" replace />} />
              <Route path="/tools/utility/unit-converter/length" element={<LengthConverter/>} />
              <Route path="/tools/utility/unit-converter/tempreture" element={<TempretureConverter/>} />
              <Route path="/tools/utility/unit-converter/time" element={<TimeConverter/>} />
              <Route path="/tools/utility/unit-converter/area" element={<AreaConverter/>} />
              <Route path="/tools/utility/unit-converter/mass" element={<MassConverter/>} />
          </Route>
          
          <Route path="/tools/image/image-compressor" element={<ImageCompressor/>} />
          <Route path="/tools/utility/password-generator" element={<PasswordGenerator/>} />
          <Route path="/tools/developer/base64-encoder" element={<Base64Tabs/>} />
          <Route path="/tools/developer/url-encoder-decoder" element={<UrlEncoderDecoder/>} />
          <Route path="/tools/developer/json-validator" element={<JsonValidator/>} />
        </Routes>
      </div>
      {/* {<Footer/>} */}
    </div>
  );
};

export default App;
