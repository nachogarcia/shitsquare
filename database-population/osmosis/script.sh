categories="\
amenity.bar,\
amenity.bbq,\
amenity.biertgarten,\
amenity.cafe,\
amenity.fast_food,\
amenity.food_court,\
amenity.pub,\
amenity.restaurant,\
amenity.college,\
amenity.library,\
amenity.fuel,\
amenity.clinic,\
amenity.hospital,\
amenity.casino,\
amenity.cinema,\
amenity.nightclub,\
amenity.toilets,\
amenity.internet_cafe,\
leisure.adult_gaming_centre,\
leisure.amusement_arcade,\
leisure.fitness_centre,\
leisure.hackerspace,\
leisure.sports_centre,\
leisure.stadium,\
leisure.water_park,\
"
osmosis --read-pbf $1 --node-key-value keyValueList=$categories --write-xml $2
