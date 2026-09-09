const TOWERS = {
  north: { lat: 40.712083, lng: -74.013139, label: 'North Tower (1 WTC) - site' },
  south: { lat: 40.710944, lng: -74.013056, label: 'South Tower (2 WTC) - site' },
  wtc7:  { lat: 40.713611, lng: -74.011389, label: '7 World Trade Center - site' }
};
const FIREHOUSE = { lat: 40.715339, lng: -74.0063, label: 'Engine 7 / Ladder 1, 100 Duane Street' };

const PEOPLE = [
  {
    id: 'naudet',
    name: 'Jules Naudet',
    role: 'Filmmaker, FDNY documentary crew',
    initials: 'JN',
    avatar: avatarMedia('Jules Naudet (2003).jpg', 'Anders Krusberg / Peabody Awards, cropped - CC BY 2.0'),
    category: 'day',
    sources: [
      'Roster photo of Naudet himself: Anders Krusberg, 62nd Annual Peabody Awards (2003), via Wikimedia Commons - CC BY 2.0',
      '“9/11” (Jules & Gedeon Naudet, Goldfish Pictures / CBS, 2002)',
      'Jules Naudet, “Under Attack” - CBS News (excerpt from “What We Saw”)',
      'Published FDNY Battalion 1 accounts and interviews',
      'National September 11 Memorial & Museum, first-person account archive',
      'Spirituality & Practice, film review - “9/11: The Filmmakers Commemorative Edition”'
    ],
    waypoints: [
      { time:'08:30', place:'Firehouse, 100 Duane Street', lat:40.715339, lng:-74.0063, conf:'confirmed',
        text:'Naudet is filming a documentary about a probationary firefighter at the Duane Street firehouse, home to FDNY Engine 7, Ladder 1, and Battalion 1.' },
      { time:'08:46', place:'Near Lispenard & Church Streets', lat:40.71760, lng:-74.00360, conf:'confirmed',
        text:'While accompanying Battalion Chief Joseph Pfeifer to investigate a reported gas leak, Naudet turns his camera skyward at the sound of a low-flying plane and captures the only known video of American Airlines Flight 11 striking the North Tower, at 8:46 a.m.',
        media: [
          { type:'link', title:'His own written account of the morning', credit:'Jules Naudet, "Under Attack" - excerpt from "What We Saw" (CBS News / Simon & Schuster)', note:'Published directly by CBS News, in his own words, describing the gas-leak call, the plane, and the minutes that followed.', url:'https://www.cbsnews.com/news/under-attack' },
          { type:'link', title:'Background on the footage and film', credit:'Spirituality & Practice - film review', note:'Rights to the footage itself are held by CBS / Goldfish Pictures. No authorized free stream exists - the film is sold on DVD and Amazon; unlicensed reuploads exist on YouTube but aren\'t linked here.', url:'https://www.spiritualityandpractice.com/films/reviews/view/5101/911-the-filmmakers-commemorative-edition' },
          { type:'video', title:'Jules & Gédéon Naudet, in their own words', credit:'National September 11 Memorial & Museum - official production', note:'The Museum\'s own recorded first-person account and teaching guide - the most legitimate place to see and hear this material.', url:'https://911memorial.org/webinars/naudet' }
        ] },
      { time:'08:50', place:'Church Street, heading south', lat:40.71480, lng:-74.00790, conf:'reconstructed',
        text:'He follows Battalion 1 south toward the World Trade Center as the chief establishes a command post.' },
      { time:'08:58', place:'North Tower lobby', lat:40.712083, lng:-74.013139, conf:'confirmed',
        text:'Naudet is filming inside the North Tower lobby, documenting the command post and the firefighters staging to climb the tower.' },
      { time:'09:59', place:'North Tower lobby / mezzanine', lat:40.71195, lng:-74.01330, conf:'confirmed',
        text:'When the South Tower collapses, the lobby is engulfed in debris and darkness. Naudet and the firefighters around him take shelter and wait for the air to clear.' },
      { time:'~10:15', place:'Moving north, away from the site', lat:40.71350, lng:-74.00850, conf:'reconstructed',
        text:'He makes his way out of the tower with FDNY personnel and moves north, away from the collapse zone.' }
    ]
  },
  {
    id: 'biggart',
    name: 'Bill Biggart',
    role: 'Freelance photojournalist',
    initials: 'BB',
    category: 'day',
    sources: [
      'International Center of Photography, Bill Biggart archive',
      'The Digital Journalist - “Bill Biggart\'s Final Exposures” (authorized photo essay)',
      'billbiggart.com (maintained by his estate)',
      'CBS News, “Bill Biggart: Final Exposures”',
      'National September 11 Memorial & Museum blog - “Remembering the Only Photojournalist Lost on 9/11”'
    ],
    waypoints: [
      { time:'~08:46', place:'Near Union Square', lat:40.7359, lng:-73.9911, conf:'confirmed',
        text:'Biggart and his wife, photographer Wendy Doremus, are out walking their dogs near Union Square - about two and a half miles north of the World Trade Center - when they see smoke and learn a plane has hit the towers.' },
      { time:'~08:50', place:'Home, near Union Square', lat:40.7359, lng:-73.9911, conf:'confirmed',
        text:'He returns home to gather his equipment: a Canon D30 digital camera, two Canon EOS-1N film bodies, and several rolls of film, before heading downtown.',
        media: [
          { type:'link', title:'His life and final assignment', credit:'National September 11 Memorial & Museum blog', note:'“Remembering the Only Photojournalist Lost on 9/11.”', url:'https://www.911memorial.org/connect/blog/remembering-only-photojournalist-lost-911' },
          { type:'link', title:'“Bill Biggart: Final Exposures”', credit:'CBS News', note:'Contemporary CBS News report on the recovery of his photographs.', url:'https://www.cbsnews.com/news/bill-biggart-final-exposures/' }
        ] },
      { time:'~09:00–09:30', place:'Heading downtown', lat:40.7247, lng:-74.0000, conf:'reconstructed',
        text:'He makes his way toward the World Trade Center, as he had for many breaking news stories near his home.' },
      { time:'09:30–10:28', place:'Near the World Trade Center site', lat:40.7118, lng:-74.0125, conf:'reconstructed',
        text:'Colleagues on the scene report seeing and speaking with Biggart as he photographs the burning towers and the rescue effort underway around them.' },
      { time:'10:28:24 a.m.', place:'World Trade Center site', lat:40.7120, lng:-74.0128, conf:'confirmed',
        text:'His last recovered photograph, precisely timestamped 10:28:24, captures the collapsing South Tower\'s remains. Moments later he is killed by the collapse of the North Tower - the only U.S. news photographer to die that day. His remains and cameras, including the memory card holding this image, were recovered from the site four days later.',
        media: [
          { type:'photo', title:'His final photograph - view it directly', credit:'Bill Biggart, via The Digital Journalist', note:'Published as an authorized essay with cooperation from his widow, Wendy Doremus, after his cameras were recovered. Not reproduced here - this links straight to the actual photograph.', url:'https://digitaljournalist.org/issue0111/biggart21.htm' },
          { type:'photo', title:'His September 11th photo essay', credit:'billbiggart.com - maintained by his estate', note:'His widow\'s own account of that morning, alongside his photographs.', url:'https://www.billbiggart.com/september-11th' },
          { type:'link', title:'Full recovery story', credit:'The Digital Journalist - “Bill Biggart\'s Final Exposures”', note:'How his cameras and final images were recovered from the site.', url:'https://digitaljournalist.org/issue0111/biggart_intro.htm' }
        ] }
    ]
  },
  {
    id: 'booher',
    name: 'Andrea Booher',
    role: 'Staff photographer, FEMA',
    initials: 'AB',
    category: 'aftermath',
    sources: [
      'FEMA News Photo archive, U.S. Dept. of Homeland Security Media Library',
      '9/11 Memorial & Museum blog - “Up Close at Ground Zero: FEMA Photos by Andrea Booher”',
      'Wikimedia Commons - Category:Andrea Booher (public domain, U.S. government works)'
    ],
    waypoints: [
      { time:'~Sept 12, 2001', place:'Ground Zero', lat:40.7115, lng:-74.0125, conf:'reconstructed',
        text:'A FEMA staff photographer, Booher arrives at the site the day after the attacks and is granted continuous access to document the agency\'s response - access that continues for roughly ten weeks.' },
      { time:'Sept 29, 2001', place:'Ground Zero', lat:40.7118, lng:-74.0122, conf:'confirmed',
        text:'Booher continues documenting the recovery effort underway at the site.',
        media: [ imgMedia('FEMA_-_5417_-_Photograph_by_Andrea_Booher_taken_on_09-29-2001_in_New_York.jpg', 'Ground Zero, September 29, 2001', 'Andrea Booher') ] },
      { time:'Oct 13, 2001', place:'Ground Zero', lat:40.7112, lng:-74.0130, conf:'confirmed',
        text:'More than a month on, recovery work continues around the clock; Booher\'s photographs from this period record the personnel and pace of the operation.',
        media: [ imgMedia('FEMA_-_5459_-_Photograph_by_Andrea_Booher_taken_on_10-13-2001_in_New_York.jpg', 'Ground Zero, October 13, 2001', 'Andrea Booher') ] },
      { time:'Oct 19, 2001', place:'Ground Zero', lat:40.7120, lng:-74.0118, conf:'confirmed',
        text:'By now Booher has taken thousands of images over her extended access to the site - part of what becomes one of the most complete photographic records of the response.',
        media: [ imgMedia('FEMA_-_5477_-_Photograph_by_Andrea_Booher_taken_on_10-19-2001_in_New_York.jpg', 'Ground Zero, October 19, 2001', 'Andrea Booher') ] }
    ]
  },
  {
    id: 'rieger',
    name: 'Michael Rieger',
    role: 'Staff photographer, FEMA',
    initials: 'MR',
    category: 'aftermath',
    sources: [
      'FEMA News Photo archive, U.S. Dept. of Homeland Security Media Library',
      'U.S. Customs & Border Protection Media Library, 9/11 FEMA Photo Collection',
      'Wikimedia Commons - Category:Michael Rieger (public domain, U.S. government works)'
    ],
    waypoints: [
      { time:'Sept 21, 2001', place:'Ground Zero', lat:40.7122, lng:-74.0128, conf:'confirmed',
        text:'A FEMA staff photographer working alongside Andrea Booher, Rieger documents the clean-up operation underway at the site, including views of the wreckage from vantage points around its edge.',
        media: [ imgMedia('FEMA_-_4049_-_Photograph_by_Michael_Rieger_taken_on_09-21-2001_in_New_York.jpg', 'Ground Zero, September 21, 2001', 'Michael Rieger') ] },
      { time:'Sept 27, 2001', place:'Ground Zero', lat:40.7115, lng:-74.0120, conf:'confirmed',
        text:'His photographs from this stretch record Urban Search and Rescue teams and FEMA personnel at work on the site, part of the same extended federal documentation effort as Booher\'s.',
        media: [ imgMedia('FEMA_-_5666_-_Photograph_by_Michael_Rieger_taken_on_09-27-2001_in_New_York.jpg', 'Ground Zero, September 27, 2001', 'Michael Rieger') ] }
    ]
  },
  {
    id: 'clark',
    name: 'Robert Clark',
    role: 'Photographer, National Geographic contributor',
    initials: 'RC',
    avatar: avatarMedia('Robert-clark-by-robert-clark.jpg', 'Robert Clark, self-portrait - CC BY-SA 4.0'),
    category: 'day',
    sources: [
      'Roster photo of Clark himself: self-portrait, via Wikimedia Commons - CC BY-SA 4.0, permission verified (VRT)',
      'Burn Magazine / Rob Clark Institute - “From my roof on 9-11” (first-person interview)',
      'World Press Photo - 2002 award collection, Robert Clark',
      'National Geographic - “This Never Before Seen Photo Captures Grief of 9/11”'
    ],
    waypoints: [
      { time:'~08:30', place:'475 Kent Avenue, Williamsburg, Brooklyn', lat:40.7104, lng:-73.9655, conf:'confirmed',
        text:'Clark returns to his loft at 475 Kent Avenue after staying at his girlfriend\'s place overnight. His apartment faces the Twin Towers across the East River, though at this moment his back is to the window.' },
      { time:'~08:46', place:'475 Kent Avenue', lat:40.7104, lng:-73.9655, conf:'confirmed',
        text:'His girlfriend calls to tell him a plane has hit the towers. He grabs his camera kit - already packed for a National Geographic assignment - and heads for the roof.',
        media: [ { type:'link', title:'Read his own account of the morning', credit:'Robert Clark, interviewed for Burn Magazine / Rob Clark Institute', note:'A detailed first-person, minute-by-minute recollection.', url:'https://www.burnmagazine.org/in-the-spotlight/2011/09/from-my-roof-by-rob-clarkinstitute/' } ] },
      { time:'08:54', place:'Rooftop, 475 Kent Avenue', lat:40.7105, lng:-73.9654, conf:'confirmed',
        text:'He reaches the roof and begins photographing the burning North Tower on film, with a 280mm lens, believing that shot is the story.' },
      { time:'09:03', place:'Rooftop, 475 Kent Avenue', lat:40.7105, lng:-73.9654, conf:'confirmed',
        text:'With ten frames left on the roll, he sees the second plane approaching and shoots the rest in the next ten seconds - a four-picture sequence of United Airlines Flight 175 striking the South Tower that becomes one of the most published images of the day, and wins a World Press Photo award.',
        media: [ { type:'photo', title:'View the award-winning sequence', credit:'Robert Clark, World Press Photo 2002 (Spot News)', note:'Hosted by World Press Photo with the photographer\'s own account of the moment.', url:'https://www.worldpressphoto.org/collection/photo-contest/2002/robert-clark/4' } ] },
      { time:'Later that morning', place:'Rooftop, 475 Kent Avenue', lat:40.7105, lng:-73.9654, conf:'reconstructed',
        text:'He never leaves the rooftop that morning. Neighbors - artists and musicians from the building - gather around him to watch the smoke rise, a quieter moment he photographs but doesn\'t publish for fifteen years.',
        media: [ { type:'photo', title:'The photo he held back for 15 years', credit:'Robert Clark, National Geographic (2016)', note:'Shared on the anniversary, with his reflection on the morning.', url:'https://www.nationalgeographic.com/photography/article/a-new-photo-and-tender-side-of-sept-11' } ] }
    ]
  },
  {
    id: 'handschuh',
    name: 'David Handschuh',
    role: 'Staff photographer, New York Daily News',
    initials: 'DH',
    category: 'day',
    sources: [
      'National September 11 Memorial & Museum blog - “Stories of Hope: Rescued from the Rubble”',
      'NPPA (National Press Photographers Association) magazine - “Never Forget: 21 Years Later, the Pictures Resonate”',
      'The Daily Beast - “Photographer David Handschuh Hunts for His 9/11 \'Guardian Angel\'”',
      'ABC7 New York - 20th anniversary coverage'
    ],
    waypoints: [
      { time:'~08:50', place:'Heading toward the World Trade Center', lat:40.7220, lng:-74.0020, conf:'reconstructed',
        text:'A Daily News staff photographer, Handschuh heads toward the towers by car, passing a fire truck racing to the scene.' },
      { time:'~09:15', place:'Near the World Trade Center', lat:40.7118, lng:-74.0122, conf:'confirmed',
        text:'Photographing the unfolding scene, he makes what becomes the last photograph of FDNY Chief Gerard Barbara looking up at the burning towers. Barbara is killed when the North Tower collapses.',
        media: [ { type:'photo', title:'View the photograph, with his account', credit:'David Handschuh, published with his permission by NPPA', note:'From NPPA\'s 21st-anniversary retrospective, in his own words.', url:'https://nppa.org/magazine/article/never-forget-21-years-later-pictures-resonate' } ] },
      { time:'09:59', place:'Near the World Trade Center', lat:40.7112, lng:-74.0130, conf:'confirmed',
        text:'As the South Tower begins to collapse, his instinct is to keep shooting - but he turns to run, is struck by debris, and thrown roughly half a block. He holds onto both cameras and the 180 or so frames already on them.' },
      { time:'09:59, moments later', place:'Buried near the collapse site', lat:40.7113, lng:-74.0129, conf:'confirmed',
        text:'Critically injured - his leg shattered - he is trapped under rubble and calls for help. Firefighters from FDNY Engine 217, searching for two of their own colleagues, hear him and pull him out.' },
      { time:'Shortly after', place:'A deli near Battery Park', lat:40.7033, lng:-74.0160, conf:'confirmed',
        text:'Firefighters and an NYPD officer carry him to safety at a nearby deli. From there he is taken by boat across the Hudson to a hospital in New Jersey, recovering after months of treatment to continue his career as a photojournalist.' }
    ]
  },
  {
    id: 'plunkett',
    name: 'Suzanne Plunkett',
    role: 'Staff photographer, Associated Press',
    initials: 'SP',
    category: 'day',
    sources: [
      'Arab News - “Photographer behind iconic 9/11 New York image recalls the date that lives in infamy”',
      'CNN - “The 9/11 photos we will never forget”',
      'Popular Photography - “9.11.01: The Photographers\' Stories, Pt. 3”',
      'suzanneplunkett.com (her official site)'
    ],
    waypoints: [
      { time:'~08:00', place:'Lower Manhattan (assignment, exact address not documented)', lat:40.7180, lng:-74.0075, conf:'estimated',
        text:'Plunkett, an AP staff photographer, has an early assignment to cover a Fashion Week shoot in Lower Manhattan. Before heading out, she turns on the television for the weather report.' },
      { time:'~09:54', place:'Fulton Street subway station', lat:40.7100, lng:-74.0090, conf:'confirmed',
        text:'She gets out of the subway at Fulton Street with, by her own account, about five minutes before the first tower - the South Tower - comes down.' },
      { time:'09:59', place:'Near Fulton & Church Streets', lat:40.7108, lng:-74.0100, conf:'confirmed',
        text:'As the South Tower collapses, she photographs people fleeing the debris cloud - including electrical engineer Stephen Cooper, running in a shirt and tie. The image runs in newspapers and magazines worldwide and enters the 9/11 Memorial Museum\'s collection.',
        media: [ { type:'photo', title:'View the photograph, with its story', credit:'Suzanne Plunkett / AP, via CBS News', note:'Published alongside the story of Stephen Cooper, one of the men in the frame.', url:'https://www.cbsnews.com/news/man-iconic-911-photo-dies-coronavirus' } ] },
      { time:'Later that morning', place:'Near the World Trade Center site', lat:40.7125, lng:-74.0110, conf:'reconstructed',
        text:'She continues documenting the scene, including shopkeeper Harry Shasho sweeping his vitamin store before being evacuated - a quieter image amid the chaos.' }
    ]
  },
  {
    id: 'samoilova',
    name: 'Gulnara Samoilova',
    role: 'Staff photographer, Associated Press',
    initials: 'GS',
    category: 'day',
    sources: [
      'Blind Magazine - “Gulnara Samoilova: A Woman Journalist at Ground Zero”',
      'Marie Claire - “Gulnara Samoilova on Capturing 9/11 Award-Winning Photos”',
      'Popular Photography - “9.11.01: The Photographers\' Stories, Pt. 3”',
      'Gothamist - “One AP Photographer\'s Iconic 9/11 Shot”'
    ],
    waypoints: [
      { time:'~08:46', place:'Apartment, four blocks from the World Trade Center', lat:40.7145, lng:-74.0090, conf:'confirmed',
        text:'Samoilova, an AP staff photographer, is asleep at home when the sound of the first impact and non-stop sirens wake her. She turns on the television and sees the North Tower on fire.' },
      { time:'~08:55', place:'Running toward the World Trade Center', lat:40.7130, lng:-74.0100, conf:'reconstructed',
        text:'She grabs whatever film is close at hand and runs the four blocks toward the towers, reaching a triage area forming at the corner of Fulton and Church Streets.' },
      { time:'09:59', place:'Fulton & Church Streets', lat:40.7108, lng:-74.0098, conf:'confirmed',
        text:'As the South Tower begins to collapse, she lifts her camera and takes one photograph through the viewfinder before running. She falls as the debris cloud hits, then hides behind a parked car as darkness and dust engulf the street.' },
      { time:'Moments later', place:'Behind a car near Church Street', lat:40.7108, lng:-74.0098, conf:'confirmed',
        text:'Enveloped in total darkness, unable to breathe, she believes she may be dying. When the dust settles enough to see, she instinctively begins photographing the survivors walking through the wreckage around her - the image that becomes her best-known work, later acquired by the Museum of Fine Arts, Houston.',
        media: [ { type:'photo', title:'View her survivors photograph', credit:'Gulnara Samoilova / AP', note:'Discussed by Gothamist; featured in the Polonsky Exhibition at the New York Public Library.', url:'https://gothamist.com/arts-entertainment/one-ap-photographers-iconic-911-shot' } ] }
    ]
  },
  {
    id: 'maisel',
    name: 'Todd Maisel',
    role: 'Staff photographer, New York Daily News',
    initials: 'TM',
    category: 'day',
    sources: [
      'New York Press Photographers Association - Todd Maisel\'s own first-person account',
      'New York State Museum - “Witness to 9/11” exhibition (Maisel & Handschuh)',
      'Library of Congress, Prints & Photographs Division',
      'toddmaiselvisualjournalism.com (his official site)'
    ],
    waypoints: [
      { time:'~08:50', place:'Heading toward the World Trade Center', lat:40.7200, lng:-74.0050, conf:'reconstructed',
        text:'A Daily News staff photographer, Maisel heads toward the towers after the first plane hits, arriving as the scene grows increasingly chaotic.' },
      { time:'~09:00–09:30', place:'Near the World Trade Center', lat:40.7118, lng:-74.0125, conf:'confirmed',
        text:'He photographs the unfolding disaster and emergency response, later recalling firefighters battling burning vehicles as debris fell from above.',
        media: [ { type:'link', title:'Read his own account of the day', credit:'Todd Maisel, published by the New York Press Photographers Association', note:'A detailed first-person account, in his own words.', url:'https://nyppa.org/todd-911' } ] },
      { time:'After the collapse', place:'West Street', lat:40.7130, lng:-74.0155, conf:'confirmed',
        text:'In the aftermath, Maisel helps rescue FDNY firefighter Kevin Shea of Ladder 35, found badly injured in the debris - carried out alongside firefighter Richie Nogan and two EMS workers.',
        media: [ { type:'photo', title:'View the rescue photograph', credit:'Todd Maisel, Library of Congress Prints & Photographs Division', note:'Archived in the Library of Congress collection.', url:'https://www.loc.gov/item/2002708962/' } ] },
      { time:'Same day', place:'Near the World Trade Center site', lat:40.7115, lng:-74.0130, conf:'confirmed',
        text:'He also assists fellow photographer David Handschuh after Handschuh is critically injured in the South Tower\'s collapse - their paths crossing amid the chaos.' },
      { time:'Following week', place:'Ground Zero', lat:40.7118, lng:-74.0120, conf:'confirmed',
        text:'Maisel spends the following week at the site, photographing the search-and-rescue and recovery effort - work later exhibited, alongside Handschuh\'s, at the New York State Museum for the 25th anniversary.',
        media: [ { type:'link', title:'“Witness to 9/11” exhibition', credit:'New York State Museum', note:'A 2026 exhibition of Maisel and Handschuh\'s photographs marking the 25th anniversary.', url:'https://nysm.nysed.gov/exhibitions/witness-to-9-11/resources' } ] }
    ]
  },
  {
    id: 'rodriguez',
    name: 'Bri Rodriguez',
    role: 'Staff photographer, FEMA',
    initials: 'BR',
    category: 'aftermath',
    sources: [
      'FEMA News Photo archive, U.S. Dept. of Homeland Security Media Library',
      'U.S. Customs & Border Protection Media Library, 9/11 FEMA Photo Collection',
      'Wikimedia Commons - Category:Bri Rodriguez (public domain, U.S. government works)'
    ],
    waypoints: [
      { time:'Sept 27, 2001', place:'Ground Zero', lat:40.7118, lng:-74.0122, conf:'confirmed',
        text:'A FEMA staff photographer, Rodriguez documents recovery operations at the site, working alongside colleagues Andrea Booher and Michael Rieger.',
        media: [ imgMedia('FEMA_-_5658_-_Photograph_by_Bri_Rodriguez_taken_on_09-27-2001_in_New_York.jpg', 'Ground Zero, September 27, 2001', 'Bri Rodriguez') ] },
      { time:'Sept 27, 2001', place:'6 World Trade Center', lat:40.7135, lng:-74.0110, conf:'confirmed',
        text:'Her photographs from this day also record 6 World Trade Center, damaged but still standing amid the wreckage of the towers.',
        media: [ imgMedia('FEMA_-_4231_-_Photograph_by_Bri_Rodriguez_taken_on_09-27-2001_in_New_York.jpg', '6 World Trade Center from WTC Plaza', 'Bri Rodriguez') ] }
    ]
  },
  {
    id: 'nachtwey',
    name: 'James Nachtwey',
    role: 'War photographer, contract photographer for TIME',
    initials: 'NA',
    avatar: avatarMedia('Nachtwey_MSK2011.jpg', 'Victor ‘rdfr’ Morozov, Moscow, 2011 - CC BY 3.0'),
    category: 'day',
    sources: [
      'Roster photo of Nachtwey himself: Victor ‘rdfr’ Morozov, Moscow (2011), via Wikimedia Commons - CC BY 3.0',
      'TIME - “Revisiting 9/11: Unpublished Photos by James Nachtwey” (2011)',
      'TIME - “9/11: The Photographs That Moved Them Most” (MaryAnne Golon\'s account)',
      'To The Best Of Our Knowledge (Wisconsin Public Radio) - interview',
      'BuzzFeed News - “Harrowing Stories Behind Some Of The Most Iconic Photos From 9/11”'
    ],
    waypoints: [
      { time:'~08:30', place:'Water Street loft, South Street Seaport', lat:40.7075, lng:-74.0035, conf:'confirmed',
        text:'Nachtwey wakes early, having flown in from France the night before - unusual timing for him. He takes his morning coffee on the east side of his loft, overlooking the East River and the Brooklyn Bridge.' },
      { time:'~08:46', place:'Water Street loft', lat:40.7075, lng:-74.0035, conf:'confirmed',
        text:'He sees smoke from the North Tower and assumes it was an accident - but, sensing it may be newsworthy regardless, begins assembling his gear.' },
      { time:'~09:03', place:'Water Street loft', lat:40.7075, lng:-74.0035, conf:'confirmed',
        text:'He feels his windows rattle as the second plane hits and immediately understands the city is under attack. He grabs his cameras and runs toward the towers.' },
      { time:'Through the day', place:'Ground Zero', lat:40.7118, lng:-74.0122, conf:'confirmed',
        text:'Over the next twelve hours he shoots 27 rolls of film at the site - images that become some of the most reproduced of the day, published by TIME.',
        media: [ { type:'photo', title:'Revisit his contact sheets, in his own words', credit:'James Nachtwey, for TIME (2011)', note:'Ten years on, he looked at the negatives for the first time and shared previously unpublished frames.', url:'https://time.com/3528699/revisiting-911-unpublished-photos-by-james-nachtwey/' } ] },
      { time:'That evening', place:'Time & Life Building, Midtown', lat:40.7607, lng:-73.9814, conf:'confirmed',
        text:'Covered in ash, he delivers his film in person to his editors. While it is processed, exhausted, he drinks water and falls asleep in a chair - the imprint of his body and his dusty footprints still visible on the floor the next morning.',
        media: [ { type:'link', title:'Read the editor\'s account of that night', credit:'MaryAnne Golon, former Director of Photography, TIME', note:'Published in TIME\'s “The Photographs That Moved Them Most.”', url:'https://time.com/3449480/911-the-photographs-that-moved-them-most/' } ] }
    ]
  },
  {
    id: 'mccurry',
    name: 'Steve McCurry',
    role: 'Photographer, Magnum Photos',
    initials: 'SM',
    avatar: avatarMedia('Steve_McCurry_in_2024_03.jpg', 'Christopher Michel, 2024 - CC BY-SA 4.0'),
    category: 'day',
    sources: [
      'Roster photo of McCurry himself: Christopher Michel (2024), via Wikimedia Commons - CC BY-SA 4.0',
      'Popular Photography (American Photo) - “Steve McCurry: The Ground Zero Photographs,” his own account',
      'CNN - “9/11 images are seared into photographers\' memories”',
      'Artforum - “September 11 in image and print”',
      'The Daily Beast - “From ‘Afghan Girl’ to Ground Zero, the World Through Steve McCurry\'s Lens”'
    ],
    waypoints: [
      { time:'~08:30', place:'Studio near Washington Square, Greenwich Village', lat:40.7308, lng:-73.9973, conf:'confirmed',
        text:'McCurry had returned from a month in Tibet the night before, landing around 8 p.m. - his equipment still packed. He is at his studio, which looks out over Lower Manhattan.' },
      { time:'~08:46', place:'Studio, Washington Square', lat:40.7308, lng:-73.9973, conf:'confirmed',
        text:'His assistant\'s mother calls the studio to say the World Trade Center is burning.' },
      { time:'~09:00', place:'Rooftop, north side of Washington Square', lat:40.7312, lng:-73.9975, conf:'confirmed',
        text:'He runs to the roof, which has an unobstructed view of the towers, and begins photographing - capturing both towers on fire and, soon after, the collapse.',
        media: [ { type:'link', title:'His photographs, discussed by fellow Magnum photographers', credit:'CNN, 2016', note:'On the collective book “New York September 11” and the photographers who made it.', url:'https://www.cnn.com/2016/09/08/us/new-york-9-11-magnum-photographers/index.html' } ] },
      { time:'That night', place:'Near the West Side Highway, Ground Zero perimeter', lat:40.7145, lng:-74.0155, conf:'confirmed',
        text:'He heads downtown, cuts a hole in a cyclone fence near the West Side Highway, and slips into Ground Zero without press credentials to photograph firefighters working atop the ruins.',
        media: [ { type:'photo', title:'Read his own account of that night', credit:'Steve McCurry, interviewed for American Photo\'s “9/11: The Photographers\' Stories”', note:'A detailed oral history, in his own words.', url:'https://www.popphoto.com/american-photo/steve-mccurry-ground-zero-photographs/' } ] },
      { time:'Sept 12, 2001', place:'Ground Zero', lat:40.7118, lng:-74.0122, conf:'confirmed',
        text:'He returns early the next morning and keeps photographing before being caught and escorted off the site by police. He does not go back again.' }
    ]
  },
  {
    id: 'lane',
    name: 'Justin Lane',
    role: 'Staff photographer, The New York Times',
    initials: 'JL',
    category: 'day',
    sources: [
      'CNN - “The 9/11 photos we will never forget” (his own quote)',
      'The Pulitzer Prizes - 2002 Breaking News Photography, Staff of The New York Times',
      'justinlane.photoshelter.com (his official portfolio)'
    ],
    waypoints: [
      { time:'That morning', place:'Heading downtown', lat:40.7350, lng:-73.9950, conf:'reconstructed',
        text:'A New York Times staff photographer, Lane makes his way toward Lower Manhattan as the scene unfolds.' },
      { time:'After the collapse', place:'Church & Dey Streets', lat:40.7108, lng:-74.0107, conf:'confirmed',
        text:'“As I made my way downtown to the area where this picture was taken, on Church Street near the intersection with Dey Street, it was difficult to make sense of what was going on,” Lane later said. “The city blocks were unrecognizable with dust and smoke.”',
        media: [ { type:'photo', title:'View the photograph', credit:'Justin Lane / The New York Times', note:'Part of the Times staff coverage awarded the 2002 Pulitzer Prize for Breaking News Photography.', url:'https://justinlane.photoshelter.com/image/I0000iHOmn56OwHM' } ] },
      { time:'Same day', place:'Near the World Trade Center site', lat:40.7115, lng:-74.0115, conf:'confirmed',
        text:'He also photographs firefighters and paramedics assisting the injured in the immediate aftermath - part of the wider Times staff effort that day.' }
    ]
  },
  {
    id: 'sancetta',
    name: 'Amy Sancetta',
    role: 'Staff photographer, Associated Press',
    initials: 'AS',
    category: 'day',
    sources: [
      'CNN - "The 9/11 photos we will never forget," Amy Sancetta\'s own account',
      'The Associated Press - 20th-anniversary retrospective of AP photographers\' work'
    ],
    waypoints: [
      { time:'09:59', place:'An open parking garage near the World Trade Center', lat:40.7130, lng:-74.0115, conf:'confirmed',
        text:'Sancetta is photographing from an open parking garage when the South Tower\'s collapse sends a wall of debris and dust through the structure. "I remember how incredibly loud it was: a crushing roar of steel and cement, of people screaming and the sound of their pounding footfalls frantically racing past me," she later said.' },
      { time:'Moments later', place:'Lower level of the parking garage', lat:40.7130, lng:-74.0115, conf:'confirmed',
        text:'As the garage fills with debris, she runs to the back of the building and down a metal staircase to find breathable air. There she finds another woman, crying, trying to reach her son by phone - Sancetta tries to help place the call, only then noticing her own hands were shaking.',
        media: [ { type:'photo', title:'View the photograph, with her account', credit:'Amy Sancetta / AP, via CNN', note:'Part of CNN\'s 20th-anniversary photographer retrospective.', url:'https://www.cnn.com/interactive/2021/09/us/9-11-photos-cnnphotos/' } ] }
    ]
  },
  {
    id: 'semendinger',
    name: 'Greg Semendinger',
    role: 'Detective, NYPD Aviation Unit',
    initials: 'SG',
    category: 'day',
    sources: [
      'NBC News - "New aerial photos of 9/11 attack released"',
      'National Institute of Standards and Technology (NIST) - released via ABC News FOIA request',
      'The Associated Press - interview quotes'
    ],
    waypoints: [
      { time:'Shortly after 08:46', place:'Airborne, NYPD helicopter over Manhattan', lat:40.7180, lng:-74.0080, conf:'confirmed',
        text:'Semendinger and his pilot are first in the air, searching for survivors who might be trapped on the towers\' rooftops. From the cockpit, he watches the second plane strike the South Tower.' },
      { time:'After the collapses', place:'Circling above the World Trade Center site', lat:40.7100, lng:-74.0160, conf:'reconstructed',
        text:'He continues taking photographs from the air as the towers collapse and the dust cloud spreads across Lower Manhattan, documenting a wide-angle view of the devastation not available from the ground.',
        media: [ { type:'link', title:'On the aerial photographs\' release', credit:'NBC News', note:'How NIST\'s FOIA-released images, including Semendinger\'s, came to light.', url:'https://www.nbcnews.com/id/wbna35330966' } ] },
      { time:'That day', place:'Airborne, searching the site', lat:40.7120, lng:-74.0120, conf:'confirmed',
        text:'"We didn\'t find one single person. It was surreal," he later said of the search. "There was no sound whatsoever, but the noise of the radio and the helicopter. I just kept taking pictures." He shot three rolls of film.' }
    ]
  }
];

// --- Fixed vantage-point entries (Vantage Points mode) ---
// `time` here is a rough internal sort key only (when the captured moment happened),
// not a sourced, displayed fact - it's approximated from each narrative below where
// no source states an exact time, so it shouldn't be shown on the page as a claim.
const ENTRIES = [
  {
    id: 'staehle',
    name: 'Wolfgang Staehle',
    initials: 'WS',
    time: '08:46',
    role: 'Net.art pioneer - fixed, unmanned webcams',
    location: 'South-facing window, apartment building, Williamsburg, Brooklyn',
    lat: 40.7145, lng: -73.9575,
    locationConf: 'reconstructed',
    narrative: 'Days before the attacks, Staehle installed two unmanned webcams in the south-facing windows of a Williamsburg apartment, part of a month-long installation titled "2001" for Postmasters Gallery. The cameras captured the Manhattan skyline as a still frame every four seconds - intended to convey the ordinary, uneventful passage of time. At 8:46 a.m., they inadvertently recorded one of only three known images of the first plane, followed by the burning towers and their eventual collapse, all as an unbroken time-lapse.',
    sightline: 'An unobstructed westward view across the East River to Lower Manhattan and the World Trade Center - the same distant vantage many Brooklyn waterfront residents had that morning, but automated and continuously recorded rather than witnessed by an operator in the moment.',
    sources: [
      'Hyperallergic - "The Brooklyn Historical Society Will Remember 9/11 With an Artist\'s Live-Stream of the Attack"',
      'National September 11 Memorial & Museum blog - on the work entering their permanent collection',
      'e-flux - "2001: An installation by Wolfgang Staehle"',
      'Rhizome - "From the Rhizome Archives: 9/11 and its Legacy"',
      'The Cathedral Church of St. John the Divine - "Transformed Overnight: The Impact of 9/11"'
    ],
    media: [
      { type:'video', title:'The work is now part of the Museum\'s permanent collection', credit:'National September 11 Memorial & Museum', note:'Read how "2001" came to be exhibited and collected.', url:'https://www.911memorial.org/connect/blog/911-memorial-museum-partners-institutions-five-boroughs-and-new-jersey-exhibit-rare' },
      { type:'link', title:'On the installation\'s original concept', credit:'e-flux', note:'Background on "2001" before September 11 changed its meaning.', url:'https://www.e-flux.com/announcements/35152/2001-an-installation-by-wolfgang-staehle' }
    ]
  },
  {
    id: 'sugimoto',
    name: 'Kei Sugimoto',
    initials: 'KS',
    time: '~09:05',
    role: 'Resident of the East Village - amateur video',
    location: 'Rooftop, 64 St. Marks Place, East Village, Manhattan',
    lat: 40.7286, lng: -73.9857,
    locationConf: 'confirmed',
    narrative: '24 years old at the time, Sugimoto was on his rooftop in the East Village when he saw people in the street staring south and noticed the North Tower burning, assuming it was an accident. After witnessing the second plane strike, he ran to retrieve his camera - a Sony VX2000 with a teleconverter - meaning his surviving footage doesn\'t capture either impact directly, but records the burning towers, the immense debris cloud, and their eventual collapse from several miles away. The tape sat in storage, undigitized, for 23 years. In 2024, while sorting old videotapes that had begun to deteriorate, he rediscovered and digitized it, releasing it publicly "for historical archival purposes only."',
    sightline: 'A distant, unobstructed view south toward the World Trade Center from the East Village - several miles north of the towers, offering a wide, elevated perspective unlike the closer street-level views most surviving footage shows.',
    sources: [
      'LADbible - exclusive interview with Kei Sugimoto',
      'Boing Boing - "New 9/11 WTC collapse footage emerges after 23 years"',
      'Kei Sugimoto\'s own video description, quoted consistently across independent outlets'
    ],
    media: [
      { type:'video', videoId:'ZBW_0fOm76k', title:'Watch the footage, from his own channel', credit:'Kei Sugimoto - uploaded to his own YouTube channel, "for historical archival purposes only"', note:'His own authorized upload of his own recording - not a third-party reupload.', url:'https://www.youtube.com/watch?v=ZBW_0fOm76k' },
      { type:'link', title:'Read his own account', credit:'LADbible', note:'Exclusive interview on why he waited 23 years to share it.', url:'https://www.ladbible.com/news/us-news/september-11-twin-tower-collapse-unseen-angle-explained-052272-20250911' }
    ]
  },
  {
    id: 'monderer',
    name: 'David Monderer',
    initials: 'DM',
    time: '~08:30',
    role: 'Photographer - fixed tripod position',
    location: 'Pedestrian walkway, Manhattan Bridge',
    lat: 40.7075, lng: -73.9903,
    locationConf: 'confirmed',
    narrative: 'Setting out that morning to photograph the city skyline, Monderer carried a medium-format camera and tripod to the Manhattan Bridge\'s recently opened pedestrian walkway. He set up at an opening in the walkway\'s fence for an unimpeded view and, at approximately 8:30 a.m. - sixteen minutes before the first plane hit - photographed the intact Twin Towers under a clear blue sky. He packed up and began walking back toward Manhattan when he heard the crash. His photograph is now believed to be among the last ever taken of the undamaged towers.',
    sightline: 'An open, unimpeded view of the Twin Towers and the Manhattan skyline from the bridge\'s pedestrian walkway, with the Brooklyn Bridge visible in the foreground.',
    sources: [
      'National September 11 Memorial & Museum blog - "Picture Tells More Than a Thousand Words"'
    ],
    media: [
      { type:'photo', title:'View the photograph', credit:'David Monderer, in the 9/11 Memorial Museum\'s permanent collection', note:'On permanent display at the start of the Museum\'s exhibit path.', url:'https://www.911memorial.org/connect/blog/picture-tells-more-thousand-words' }
    ]
  },
  {
    id: 'mclamb',
    name: 'Aaron McLamb',
    initials: 'AM',
    time: '~08:48',
    role: 'Amateur photographer - fixed window position',
    location: 'A 10th-floor window near the Brooklyn Bridge',
    lat: 40.7127, lng: -74.0059,
    locationConf: 'estimated',
    narrative: 'Arriving at work just before the first plane struck, McLamb stepped to a 10th-floor window as smoke began pouring from the North Tower and lifted his camera. From that fixed vantage, he photographed FDNY Ladder Company 118\'s bright red truck racing across the Brooklyn Bridge toward the towers. A week later, he brought his developed photos to the firehouse; the surviving crew recognized the truck as their own. All six firefighters aboard Ladder 118 were killed. The photograph ran on the front page of the New York Daily News.',
    sightline: 'A high, fixed view down onto the Brooklyn Bridge from a 10th-floor window, capturing the span with the towers beyond.',
    sources: [
      'GreaterGood - "Famous 9/11 Photo Captured Ladder 118 Racing Toward the Disaster"',
      'All That\'s Interesting - "The Story Behind the 9/11 Photo of a Doomed Fire Truck," citing the New York Daily News'
    ],
    media: [
      { type:'photo', title:'Read the full story behind the photograph', credit:'Aaron McLamb', note:'Includes an account from a surviving firefighter of Ladder 118\'s house.', url:'https://allthatsinteresting.com/ladder-118-september-11-photo' }
    ]
  },
  {
    id: 'guenther',
    name: 'Kelly Guenther',
    initials: 'KG',
    time: '~09:03',
    role: 'Photographer - fixed position, Brooklyn Heights Promenade',
    location: 'Brooklyn Heights Promenade',
    lat: 40.6961, lng: -73.9967,
    locationConf: 'confirmed',
    narrative: 'After the first plane hit, Guenther grabbed her camera gear and ran to the Brooklyn Heights Promenade, which overlooks New York Harbor and the Lower Manhattan skyline. From there she saw the second plane approaching over the Statue of Liberty. "I knew what was going to happen," she recalled. She held her position, framed the skyline wide in her viewfinder, and waited for the plane to enter the frame. Her photograph of the impact ran on front pages worldwide the next day.',
    sightline: 'A wide, elevated, unobstructed view across the harbor to the full Lower Manhattan skyline - one of the most commonly used vantage points for photographing the towers from Brooklyn.',
    sources: [
      'CNN - "The 9/11 photos we will never forget," Kelly Guenther\'s own account'
    ],
    media: [
      { type:'photo', title:'View the photograph, with her account', credit:'Kelly Guenther, via CNN', note:'Part of CNN\'s 20th-anniversary photographer retrospective.', url:'https://www.cnn.com/interactive/2021/09/us/9-11-photos-cnnphotos/' }
    ]
  },
  {
    id: 'webb',
    name: 'Alex Webb',
    initials: 'AW',
    time: '~09:20',
    avatar: avatarMedia('Alex Webb.jpg', 'John Ramspott - CC BY 2.0'),
    role: 'Photographer, Magnum Photos - fixed rooftop position',
    location: 'A stranger\'s rooftop, Brooklyn Heights',
    lat: 40.6955, lng: -73.9950,
    locationConf: 'confirmed',
    narrative: 'Webb was out buying groceries in Park Slope when he overheard passersby discussing a plane crash at the World Trade Center. He and his wife, photographer Rebecca Norris Webb, drove toward Manhattan; as they got out of their car in Brooklyn Heights, a woman named Jenna Piccirillo came out of her building and asked if they\'d like to see the view from her roof. There, Webb photographed Piccirillo holding her three-month-old son, Vaughan, as a crowd gathered around them watching the towers burn. He stayed on that rooftop rather than continuing into Manhattan.',
    sightline: 'A residential rooftop view across the East River toward Lower Manhattan, shared with a small crowd of neighbors who had gathered there - an intimate, communal vantage rather than a professional one.',
    sources: [
      'Roster photo of Webb himself: John Ramspott, via Wikimedia Commons - CC BY 2.0',
      'Smithsonian Magazine - "September 11 From a Brooklyn Rooftop," with accounts from both Webb and Piccirillo'
    ],
    media: [
      { type:'photo', title:'Read the full story, with the photograph', credit:'Alex Webb / Magnum Photos, via Smithsonian Magazine', note:'Includes Jenna Piccirillo\'s own account and a follow-up visit two years later.', url:'https://www.smithsonianmag.com/arts-culture/september-11-from-a-brooklyn-rooftop-89680350/' }
    ]
  }
];

const CONF_COLOR = { confirmed:'#c99a3d', reconstructed:'#b5562e', estimated:'#5b84a6' };
const CONF_DASH  = { confirmed:null, reconstructed:'8,6', estimated:'1,6' };
const CASING = 'rgba(15,18,22,0.65)';

function avatarMedia(filename, credit){
  return {
    src: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=120`,
    credit,
    url: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`
  };
}

function imgMedia(filename, caption, photographer){
  const base = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;
  return {
    type: 'image',
    title: caption,
    credit: `Photo by ${photographer} / FEMA - public domain (U.S. government work)`,
    note: 'Via Wikimedia Commons. Public domain: not subject to copyright, no license needed.',
    src: `${base}?width=480`,
    fullSrc: `${base}`,
    url: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`
  };
}
