# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

jobs = Job.create([
  { 
    name: "1 bedroom",
    time: 1,
    price: 2500
  },
  { 
    name: "2 bedrooms",
    time: 2,
    price: 5000
  },
  { 
    name: "3 bedrooms",
    time: 3,
    price: 7500
  },
  { 
    name: "4 bedrooms",
    time: 4,
    price: 10000
  },
  { 
    name: "5+ bedrooms",
    time: 4,
    price: 12500
  },
  { 
    name: "1 bathroom",
    time: 1,
    price: 2500
  },
  { 
    name: "2 bathrooms",
    time: 2,
    price: 5000
  },
  { 
    name: "3+ bathrooms",
    time: 3,
    price: 7500
  },
  { 
    name: "2 bathrooms",
    time: 2,
    price: 5000
  },
  { 
    name: "Fridge",
    time: 0.5,
    price: 1250
  },
  { 
    name: "Oven",
    time: 0.5,
    price: 1250
  },
  { 
    name: "Inside Cabinets",
    time: 1,
    price: 2500
  },
  { 
    name: "Interior Windows",
    time: 1,
    price: 2500
  },
  { 
    name: "Interior Walls",
    time: 1,
    price: 2500
  }
])
