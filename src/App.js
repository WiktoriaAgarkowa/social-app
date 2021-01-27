  
import React, {useEffect} from 'react';
import SocialApp from './SocialApp';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


library.add(fab, faHeart)

function App() {

  useEffect(() => {
    localStorage.clear();
  });

  return (
      <SocialApp />
  )
}

export default App;