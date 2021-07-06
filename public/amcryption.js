
//______________   This is the Encoder Class ________________

class Encoder {
  // Constructors
  constructor() {
    this.lowerChars = generatea2z();
    this.upperChars = generateA2Z();
    this.numChars = generateNumChars();
  }

  //   function to encode the string
  encode = (string) => {
    // Encoding number with custom encoder
    let encodedString = "";
    for (let i = string.length - 1; i >= 0; i--) {
      encodedString = encodedString.concat(this.encodeChar(string.charAt(i)));
    }

    return btoa(encodedString);
  };

  // Custom Encoder method
  encodeChar = (c) => {
    let s = this.encodeA2Z(c);

    if (s.length <= 0) {
      s = this.encodea2z(c);

      if (s.length <= 0) {
        s = this.encodeNums(c);

        if (s.length <= 0) {
          s = this.encodeOthersChar(c);
        }
      }
    }

    return s;
  };

  /*
  Function to encode [A - Z]
  */
  encodeA2Z = (c) => {
    let s = "";
    let seq = charSequences(this.lowerChars, this.upperChars);
    for (let i = 0; i < this.upperChars.length; i++) {
      if (this.upperChars[i] === c) {
        s = seq[seq.length - 1 - i];
        break;
      }
    }

    return s;
  };

  /*
 Function to encode [a - z]
 */
  encodea2z = (c) => {
    let s = "";
    let seq = charSequences1(this.lowerChars, this.upperChars);
    for (let i = 0; i < this.lowerChars.length; i++) {
      if (this.lowerChars[i] === c) {
        s = seq[seq.length - 1 - i];
        break;
      }
    }

    return s;
  };

  /*
  Function to encode [Numbers 0 - 9]
 */
  encodeNums = (c) => {
    let s = "";
    let seq = charSequences2(this.lowerChars, this.upperChars);
    for (let i = 0; i < this.numChars.length; i++) {
      if (this.numChars[i] === c) {
        s = seq[seq.length - 1 - i];
        break;
      }
    }

    return s;
  };

  /*
If other than known char are sent for encoding
 */
  encodeOthersChar = (c) => {
    return this.upperChars[7] + c + this.lowerChars[25];
  };
}

/* ___________________Decoder Class____________________________*/
class Decoder {
  // Constructor
  constructor() {
    this.lowerChars = generatea2z();
    this.upperChars = generateA2Z();
    this.numChars = generateNumChars();
  }

  // Funxtion to decode the string
  decode = (string) => {
    let s = null;
    s = atob(string);
    let decodedString = "";
    for (let i = (s.length - 1); i >= 0; i--) {
      if ((i % 3) === 0) {
        decodedString = decodedString.concat(this.decodeString(s.charAt(i) + s.charAt(i + 1) + s.charAt(i + 2)));
      }
    }

    return decodedString;
  };

  // Custom Decoding Method
  decodeString = (s) => {
    let str = null;
    str = this.decodeA2Z(s)

    if (str.length <= 0) {
      str = this.decodea2z(s);

      if (str.length <= 0) {
        str = this.decodeNums(s);

        if (str.length <= 0) {
          str = this.decodeOthersChar(s);
        }
      }
    }

    return str;
  };

  /*___________________________________Decoding Function____________________*/

  /*
  Function to decode [A - Z]
  */
  decodeA2Z = (s) => {
    let str = "";
    let seq = charSequences(this.lowerChars, this.upperChars);
    for (let i = 0; i < seq.length; i++) {
      if (seq[i] === s) {
        str = this.upperChars[this.upperChars.length - 1 - i];
        break;
      }
    }

    return str;
  };

  /*
        Function to decode [a - z]
        */
  decodea2z = (s) => {
    let str = "";
    let seq = charSequences1(this.lowerChars, this.upperChars);
    for (let i = 0; i < seq.length; i++) {
      if (seq[i] === s) {
        str = this.lowerChars[this.lowerChars.length - 1 - i];
        break;
      }
    }

    return str;
  };

  /*
        Function to decode [Numbers 0 - 9]
         */
  decodeNums = (s) => {
    let str = "";
    let seq = charSequences2(this.lowerChars, this.upperChars);
    for (let i = 0; i < seq.length; i++) {
      if (seq[i] === s) {
        str = this.numChars[this.numChars.length - 1 - i];
        break;
      }
    }

    return str;
  };

  /*
        If other than known char are sent for decoding
         */
  decodeOthersChar = (s) => {
    return s.charAt(1);
  };
}

// ________________These are some methods________________
// Function to generate char A -Z
const generateA2Z = () => {
  let upperChars = [26];
  let index = 0;
  for (let i = 65; i < 91; i++) {
    upperChars[index] = String.fromCharCode(i);
    index++;
  }

  return upperChars;
};

// Function to generate char a-z
const generatea2z = () => {
  let lowerChars = [26];
  let index = 0;
  for (let i = 97; i < 123; i++) {
    lowerChars[index] = String.fromCharCode(i);
    index++;
  }

  return lowerChars;
};

// Function to generate number from 0 - 9
const generateNumChars = () => {
  let numChars = [10];
  for (let i = 0; i < 10; i++) {
    numChars[i] = i.toString();
  }

  return numChars;
};

// Function to generate random Charsequences
const charSequences = (lowerChars, upperChars) => {
  let charSeq = [];
  let m = 6,
    n = 17;

  for (let i = 0; i < lowerChars.length; i++) {
    if (n < 26) {
      if (i % 3 === 0) {
        charSeq[i] =
          upperChars[n] + lowerChars[lowerChars.length - 1 - i] + upperChars[i];
      } else if (i % 5 === 0) {
        charSeq[i] =
          lowerChars[lowerChars.length - 1 - i] + upperChars[n] + lowerChars[i];
      } else {
        charSeq[i] =
          lowerChars[lowerChars.length - 1 - i] + upperChars[i] + upperChars[n];
      }
      n++;
    } else {
      if (i % 2 === 0) {
        charSeq[i] =
          upperChars[i] + lowerChars[lowerChars.length - 1 - i] + upperChars[m];
      } else if (i % 7 === 0) {
        charSeq[i] =
          lowerChars[m] + upperChars[i] + lowerChars[lowerChars.length - 1 - i];
      } else {
        charSeq[i] =
          lowerChars[i] + upperChars[m] + upperChars[lowerChars.length - 1 - i];
      }
      m++;
    }
  }

  return charSeq;
};

// Function to generate random Charsequences 1
const charSequences1 = (lowerChars, upperChars) => {
  let charSeq = [];
  let m = 0,
    n = 11;

  for (let i = 0; i < lowerChars.length; i++) {
    if (n < 26) {
      if (i % 2 === 0) {
        charSeq[i] =
          lowerChars[n] + upperChars[lowerChars.length - 1 - i] + lowerChars[i];
      } else if (i % 5 === 0) {
        charSeq[i] =
          upperChars[lowerChars.length - 1 - i] + lowerChars[i] + upperChars[n];
      } else {
        charSeq[i] =
          lowerChars[i] + upperChars[n] + upperChars[lowerChars.length - 1 - i];
      }
      n++;
    } else {
      if (i % 2 === 0) {
        charSeq[i] =
          lowerChars[m] + upperChars[lowerChars.length - 1 - i] + lowerChars[i];
      } else if (i % 5 === 0) {
        charSeq[i] =
          upperChars[lowerChars.length - 1 - i] + lowerChars[i] + upperChars[m];
      } else {
        charSeq[i] =
          lowerChars[i] + upperChars[m] + upperChars[lowerChars.length - 1 - i];
      }
      m++;
    }
  }

  return charSeq;
};

/* CharSequence2 */
const charSequences2 = (lowerChars, upperChars) => {
  let charSeq = [10];
  let m = 3;
  let n = 15;
  let o = 8;
  for (let i = 0; i < 10; i++) {
    if (i % 2 == 0) {
      charSeq[i] = lowerChars[n] + upperChars[m] + lowerChars[o];
    } else if (i % 5 == 0) {
      charSeq[i] = upperChars[o] + lowerChars[n] + upperChars[m];
    } else {
      charSeq[i] = lowerChars[m] + upperChars[n] + upperChars[o];
    }
    n++;
    m++;
    o++;
  }

  return charSeq;
};